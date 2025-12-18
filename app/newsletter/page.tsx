import { NewsletterSubscription } from "@/components/common";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Newsletter - Buddhsen Tripathi",
    description: "Subscribe to my newsletter for updates on web development, AI, and personal projects.",
    openGraph: {
        title: "Newsletter - Buddhsen Tripathi",
        description: "Subscribe to my newsletter for updates on web development, AI, and personal projects.",
        url: "https://buddhsentripathi.com/newsletter",
    },
    twitter: {
        card: "summary_large_image",
        title: "Newsletter - Buddhsen Tripathi",
        description: "Subscribe to my newsletter for updates on web development, AI, and personal projects.",
        images: ["/default-image.webp"],
    },
};

export default function NewsletterPage() {
    return (
        <div className="container max-w-4xl items-center space-y-8">
            <Link 
                href="/" 
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors focus-ring rounded-sm"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
            </Link>
            <div className="mx-auto px-4 py-8 md:py-12 lg:py-20">
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary text-tracking-tight mb-4">
                        Join My Newsletter
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                        Personal stories. Tech updates. No spam, just value.
                    </p>

                    <NewsletterSubscription />

                    <p className="mt-8 text-sm text-muted-foreground">
                        You can unsubscribe at any time. Your privacy is respected.
                    </p>
                </div>
            </div>
        </div>
    );
}