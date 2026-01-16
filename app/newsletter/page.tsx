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
        <div className="container max-w-2xl space-y-12">
            <Link 
                href="/" 
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                back
            </Link>
            
            <div className="space-y-8">
                <div className="space-y-4">
                    <h1 className="text-2xl md:text-3xl font-serif italic text-foreground">
                        newsletter
                    </h1>
                    <p className="text-muted-foreground leading-relaxed">
                        Personal stories. Tech updates. No spam, just value.
                    </p>
                </div>

                <NewsletterSubscription />

                <p className="text-sm text-muted-foreground">
                    You can unsubscribe at any time. Your privacy is respected.
                </p>
            </div>
        </div>
    );
}