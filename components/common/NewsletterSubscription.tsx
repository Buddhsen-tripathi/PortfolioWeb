'use client'

import { CalendarHeart, CalendarPlus } from 'lucide-react'
import React, { useState } from 'react'

export default function NewsletterSubscription() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(false)

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim() }),
            })

            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.error || 'Unable to subscribe. Please try again later.')
            }
            setSuccess(true)
            setEmail('')
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="group block p-6 border border-border rounded-lg shadow-md shadow-primary/15 hover:shadow-lg transition-all bg-card">
            <h2 className="text-2xl font-bold mb-2 text-foreground text-tracking-tight">
                Never Miss a <span className='text-destructive'>Blog</span>
            </h2>
            <p className="mb-4 text-md text-muted-foreground leading-relaxed">
                It's <span className='text-green-600'>free!</span> Get notified instantly whenever a new post drops. Stay updated, stay ahead.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-2 border rounded-lg shadow-sm shadow-primary/15 focus:outline-none focus:ring-2 focus:ring-primary bg-background dark:bg-background focus-ring transition-colors"
                    required
                />
                <div className="flex items-center gap-8 mt-4">
                    {(error || success) && (
                        <p className="text-sm">
                            {error ? (
                                <span className="text-destructive">{error}</span>
                            ) : (
                                <span className="text-chart-1">Subscribed successfully!</span>
                            )}
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`ml-auto inline-flex items-center justify-center gap-2 px-6 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm transition-all duration-300 min-w-[140px] focus-ring ${
                            success 
                                ? 'text-chart-1 bg-chart-1/10 hover:bg-chart-1/20' 
                                : 'text-primary-foreground bg-primary hover:bg-primary/90'
                        }`}
                    >
                        {success ? (
                            <>
                                <CalendarHeart size={16} className="animate-pulse" />
                                Subscribed!
                            </>
                        ) : loading ? (
                            <>
                                <div className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full"></div>
                                Subscribing...
                            </>
                        ) : (
                            <>
                                <CalendarPlus size={16} />
                                Subscribe
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}
