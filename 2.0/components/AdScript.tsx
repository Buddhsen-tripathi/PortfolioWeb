'use client'

import Script from 'next/script'

export function AdScript() {
  if (!process.env.AD_SCRIPT_URL) return null

  return (
    <Script
      id="adsense-script"
      src={process.env.AD_SCRIPT_URL}
      strategy="lazyOnload" 
      async
    />
  )
}