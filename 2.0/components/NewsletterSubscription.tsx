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
        <div className="group block p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white dark:bg-black dark:border-gray-700 shadow-gray-200 dark:shadow-gray-800">
            <h2 className="text-2xl font-bold mb-2 dark:text-white">Never Miss a <span className='text-red-600'>Blog</span></h2>
            <p className="mb-4 text-md text-muted-foreground dark:text-gray-400">
                It's <span className='text-green-600'>free!</span> Get notified instantly whenever a new post drops. Stay updated, stay ahead.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-black dark:text-white"
                    required
                />
                <div className="flex items-center gap-8 mt-4">
                    {(error || success) && (
                        <p className="text-s">
                            {error ? (
                                <span className="text-red-600">{error}</span>
                            ) : (
                                <span className="text-green-600">Subscribed successfully!</span>
                            )}
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`ml-auto inline-flex items-center justify-center gap-2 px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm transition-all duration-300 min-w-[140px] ${
                            success 
                                ? 'text-green-600 bg-green-100 dark:bg-green-900/20' 
                                : 'text-primary bg-primary/20 hover:bg-primary/40'
                        }`}
                    >
                        {success ? (
                            <>
                                <CalendarHeart size={16} className="animate-pulse" />
                                Subscribed!
                            </>
                        ) : loading ? (
                            <>
                                <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
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