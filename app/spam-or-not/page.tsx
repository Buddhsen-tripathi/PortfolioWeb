'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, Loader2, AlertCircle, CheckCircle, Twitter } from 'lucide-react';
import { ViewCounter } from '@/components/common';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Progress } from "@/components/ui/progress";

interface SpamAnalysisResult {
    isSpam: boolean;
    reason: string;
    spamScore: number;
    exaResults?: any[];
    geminiAnalysis?: any;
}

export default function SpamOrNotPage() {
    const [username, setUsername] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [result, setResult] = useState<SpamAnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [submittedUsername, setSubmittedUsername] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const trimmedUsername = username.trim();
        if (!trimmedUsername) {
            setError('Please enter a Twitter/X username.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setResult(null);
        setSubmittedUsername(trimmedUsername);

        try {
            const response = await fetch('/api/spam-or-not', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: trimmedUsername }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error('Too many requests. Please wait a moment and try again.');
                }
                throw new Error(data.error || `API request failed with status ${response.status}`);
            }

            setResult(data);

        } catch (err: any) {
            console.error("API Call failed:", err);
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const getScoreColor = (score: number): string => {
        if (score > 7) return 'text-destructive';
        if (score > 4) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-green-600 dark:text-green-400';
    };

    return (
        <main className="container flex flex-col space-y-8">
            
            <div className="flex items-center justify-between">
                <Link href="/projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    back
                </Link>
                <div className="text-sm text-muted-foreground">
                    <ViewCounter slug="spam-or-not" readOnly={false} />
                </div>
            </div>

            <div className="space-y-4">
                <h1 className="text-2xl md:text-3xl font-serif italic text-foreground">spam checker</h1>
                <p className="text-muted-foreground leading-relaxed">
                    Enter a Twitter/X username (without the @) to analyze their recent activity for potential spam-like behavior using AI.
                </p>
                <p className="text-sm text-muted-foreground">
                    Built using Exa and Gemini AI models.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <Label htmlFor="username" className="sr-only">Twitter/X Username</Label>
                    <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value.replace(/@/g, ''))}
                        placeholder="e.g., elonmusk"
                        disabled={isLoading}
                        required
                        className="pl-10 bg-transparent border-muted-foreground/30 focus:border-foreground"
                    />
                </div>
                <Button type="submit" disabled={isLoading} variant="outline" className="w-full border-muted-foreground/30 hover:bg-muted">
                    {isLoading ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
                    ) : (
                        'check for spam'
                    )}
                </Button>
            </form>

            {error && (
                <Alert variant="destructive" className="mb-8">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {result && !isLoading && (
                <Card className="overflow-hidden animate-in fade-in duration-500 border-muted-foreground/20 bg-transparent">
                    <CardHeader className="pb-4">
                        <CardTitle className="flex items-center justify-between text-base font-normal">
                            <span className="font-serif italic">@{submittedUsername}</span>
                            <Badge variant={result.isSpam ? "destructive" : "outline"} className={`text-xs font-normal ${!result.isSpam && 'border-green-500/50 text-green-600 dark:text-green-400'}`}>
                                {result.isSpam ? <AlertCircle className="w-3 h-3 mr-1" /> : <CheckCircle className="w-3 h-3 mr-1" />}
                                {result.isSpam ? 'likely spam' : 'likely not spam'}
                            </Badge>
                        </CardTitle>
                        <CardDescription className="text-xs">based on recent activity analysis</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label className="text-xs text-muted-foreground">reason</Label>
                            <p className="text-sm text-foreground">{result.reason}</p>
                        </div>
                        <div>
                            <Label className="text-xs text-muted-foreground mb-1 block">spam score ({result.spamScore}/10)</Label>
                            <div className="relative w-full h-1.5 rounded-full overflow-hidden bg-muted">
                                <Progress value={result.spamScore * 10} className={`absolute top-0 left-0 h-full w-full ${getScoreColor(result.spamScore).replace('text-', 'bg-')}`} style={{ transformOrigin: 'left center' }} />
                            </div>
                            <p className={`text-xs mt-1 ${getScoreColor(result.spamScore)}`}>
                                {result.spamScore > 7 ? 'high spam likelihood' : result.spamScore > 4 ? 'moderate spam likelihood' : 'low spam likelihood'}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
            <p className="text-xs text-muted-foreground text-center">
                Note: This analysis is based on recent activity and may not be accurate. Always use caution when interacting with accounts.
            </p>
        </main>
    );
}
