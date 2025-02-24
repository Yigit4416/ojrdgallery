'use client'
import { useAuth, useUser } from '@clerk/nextjs'
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: "/ingest",
      ui_host: 'https://eu.posthog.com'
    })
  }, [])

  return (
    <PHProvider client={posthog}>
      <PostHogAuthWrapper>{children}</PostHogAuthWrapper>
    </PHProvider>
  )
}

function PostHogAuthWrapper({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const userInfo = useUser();

  // We wil idenfity user when signed in
  // We will reset it when user signed out
  
  useEffect(() => {
    if(userInfo.user) {
      posthog.identify(userInfo.user.id, {
        email: userInfo.user.emailAddresses[0]?.emailAddress,
        username: userInfo.user.username
      })
    } else if (!auth.isSignedIn){
      posthog.reset();
    }
  }, [auth, userInfo])

  return(
    children
  )
}