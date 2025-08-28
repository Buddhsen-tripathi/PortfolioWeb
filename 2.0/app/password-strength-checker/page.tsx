'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Lock, AlertCircle, CheckCircle, Eye, EyeOff, ShieldCheck, ShieldQuestion, Clock, ShieldAlert } from 'lucide-react'
import ViewCounter from '@/components/ViewCounter'
import zxcvbn, { ZXCVBNResult } from 'zxcvbn'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'

export default function PasswordStrengthCheckerPage() {
  const [password, setPassword] = useState('')
  const [strength, setStrength] = useState<ZXCVBNResult | null>(null)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  useEffect(() => {
    if (password) {
      const result = zxcvbn(password)
      setStrength(result)
    } else {
      setStrength(null)
    }
  }, [password])

  const getProgressColor = () => {
    if (!strength) return 'bg-gray-300 dark:bg-gray-700'
    switch (strength.score) {
      case 0: return 'bg-red-500'
      case 1: return 'bg-orange-500'
      case 2: return 'bg-yellow-500'
      case 3: return 'bg-green-500'
      case 4: return 'bg-emerald-500'
      default: return 'bg-gray-300 dark:bg-gray-700'
    }
  }

  const getStrengthText = () => {
    if (!strength) return 'Enter a password'
    const texts = ['Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong']
    return texts[strength.score]
  }

  const getStrengthIcon = () => {
    if (!strength) return <ShieldQuestion className="w-5 h-5 text-muted-foreground" />
    switch (strength.score) {
      case 0:
      case 1:
        return <ShieldAlert className="w-5 h-5 text-red-500" />
      case 2:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case 3:
      case 4:
        return <ShieldCheck className="w-5 h-5 text-green-500" />
      default:
        return <ShieldQuestion className="w-5 h-5 text-muted-foreground" />
    }
  }

  const formatCrackTime = (timeInSeconds: number) => {
    if (timeInSeconds < 1) return '< 1 second'
    if (timeInSeconds < 60) return `${Math.round(timeInSeconds)} seconds`
    if (timeInSeconds < 3600) return `${Math.round(timeInSeconds / 60)} minutes`
    return `${Math.round(timeInSeconds / 3600)} hours`
  }

  return (
    <main className="container max-w-4xl">
      
      <div className="flex items-center justify-between">
        <Link href="/projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Link>
        <div className="text-sm text-muted-foreground">
          <ViewCounter slug="password-strength-checker" readOnly={false} />
        </div>
      </div>

      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold my-4">Password Strength Checker</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Instantly analyze your password's strength. All checks are done securely in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-4xl mx-auto">
          <div className="space-y-4 md:sticky md:top-24">
            <Label htmlFor="password-input" className="font-bold text-lg">Your Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="password-input"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type a password to analyze..."
                className="pl-10 pr-10 h-12 text-lg"
                autoFocus
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-9 w-9 text-muted-foreground"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </Button>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 font-medium">
                {getStrengthIcon()}
                <span>{getStrengthText()}</span>
              </div>
              <div className="text-muted-foreground">
                {password.length} characters
              </div>
            </div>
            <Progress value={strength ? (strength.score / 4) * 100 : 0} className={`h-2 ${getProgressColor()}`} />
          </div>

          <div className="min-h-[300px]">
            {strength ? (
              <Card className="overflow-hidden animate-in fade-in duration-500">
                <CardHeader>
                  <CardTitle>Analysis Report</CardTitle>
                  <CardDescription>Here's the breakdown of your password's strength.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 rounded-lg bg-secondary/50 border">
                    <Label className="text-xs text-muted-foreground flex items-center"><Clock className="w-3 h-3 mr-1.5" /> Time to Crack</Label>
                    <p className="text-xl font-bold text-primary">
                      {formatCrackTime(Number(strength.crack_times_seconds.offline_slow_hashing_1e4_per_second))}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Estimated for offline, slow hash attack.</p>
                  </div>

                  {strength.score >= 3 && (
                    <Alert className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <AlertTitle className="text-green-800 dark:text-green-300">Excellent Strength</AlertTitle>
                      <AlertDescription className="text-green-700 dark:text-green-400">
                        This is a strong password. Keep it safe and unique.
                      </AlertDescription>
                    </Alert>
                  )}

                  {strength.feedback?.warning && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Warning</AlertTitle>
                      <AlertDescription>{strength.feedback.warning}</AlertDescription>
                    </Alert>
                  )}

                  {strength.feedback?.suggestions?.length > 0 && (
                    <div>
                      <Label className="font-semibold">Suggestions</Label>
                      <ul className="text-sm list-none mt-2 space-y-2">
                        {strength.feedback.suggestions.map((suggestion: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg h-full">
                <ShieldQuestion className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg">Awaiting Analysis</h3>
                <p className="text-muted-foreground text-sm">Your password strength report will appear here.</p>
              </div>
            )}
          </div>
        </div>

        <Alert className="mt-16 max-w-2xl mx-auto bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
          <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertTitle className="text-blue-800 dark:text-blue-300">Your Privacy is Protected</AlertTitle>
          <AlertDescription className="text-blue-700 dark:text-blue-400">
            This password check is performed entirely in your browser using JavaScript.<br />
            No password data is ever sent to servers or stored anywhere.
          </AlertDescription>
        </Alert>
      </div>
    </main>
  )
}
