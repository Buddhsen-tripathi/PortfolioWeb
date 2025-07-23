'use client'

import { useState, useRef } from "react";
import { birthdayRankings, defaultRanking } from "./rankings";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ViewCounter from "@/components/ViewCounter";
import { AdScript } from "@/components/AdScript";

interface Ranking {
    date: string;
    ranking: string;
}

const BirthdayRankings = () => {
    const [birthday, setBirthday] = useState("");
    const [result, setResult] = useState<Ranking | null>(null);
    const [inputDisabled, setInputDisabled] = useState(false);
    const screenshotRef = useRef(null);

    const handleInputChange = (event: { target: { value: any; }; }) => {
        let value = event.target.value;
        if (/^(\d{2})\/(\d{2})$/.test(value)) {
            setInputDisabled(false);
        } else {
            setInputDisabled(false);
        }

        if (value.length > 5) {
            value = value.slice(0, 5);
        }
        setBirthday(value);
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const foundRanking = birthdayRankings.find(
            (entry: { date: string; }) => entry.date === birthday
        );

        setResult(foundRanking || defaultRanking);
    };

    const getTwitterShareLink = async () => {
        if (!result) return;
        const tweet = `I just found out my 2025 Birthday Ranking is ${result.ranking} 🎉 Try it yourself: buddhsentripathi.com/2025-birthday-rankings`;
        const twitterShareURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
        window.open(twitterShareURL, "_blank");
    };

    return (
        <div className="container max-w-4xl">
            <AdScript />
            <div className="w-full flex items-center justify-between mb-6">
                <Link 
                    href="/projects" 
                    className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors focus-ring rounded-lg"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Projects
                </Link>
                <div className="flex items-center text-sm text-muted-foreground">
                    <ViewCounter slug="2025-birthday-rankings" readOnly={false} />
                </div>
            </div>
            <div className="space-y-8">
                <div className="flex justify-center items-center bg-background">
                    <div className="max-w-xl w-full bg-card text-card-foreground rounded-lg shadow-xl shadow-primary/15 border border-border mt-4 md:mt-8 p-6" ref={screenshotRef}>
                        <h1 className="text-3xl font-bold text-center text-primary text-tracking-tight mb-8">
                            2025 Lucky Birthday Rankings 🎉
                        </h1>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="Enter your birthday (MM/DD)"
                                value={birthday}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg shadow-sm shadow-primary/15 focus:outline-none focus:ring-2 focus:ring-primary bg-background dark:bg-background focus-ring transition-colors"
                                required
                                disabled={inputDisabled}
                            />
                            <button
                                type="submit"
                                className="bg-primary text-primary-foreground p-3 rounded-lg hover:bg-primary/90 transition-colors focus-ring font-medium shadow-sm"
                            >
                                Find My Ranking
                            </button>
                        </form>

                        {result && (
                            <div className="mt-6 bg-secondary dark:bg-secondary/90 text-secondary-foreground p-4 rounded-lg shadow-md shadow-primary/15 border border-border">
                                <h2 className="text-xl font-semibold text-primary text-center text-tracking-normal">
                                    Your Ranking: {result.ranking}
                                </h2>
                                <div className="flex justify-center mt-4">
                                    <button
                                        onClick={getTwitterShareLink}
                                        className="bg-chart-1 hover:bg-chart-1/90 text-primary-foreground py-2 px-6 rounded-lg transition-colors focus-ring font-medium shadow-sm shadow-primary/15"
                                    >
                                        Share on X (Twitter)
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BirthdayRankings;