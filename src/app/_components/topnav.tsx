"use client";

import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'
import SimpleUploadButton from './simple-upload-button';

// justify-between sayesinde bu iki div arası açıldı
export default function TopNav() {
  // next/navigation'dan çektiğine dikakt et

    return(
      <nav className="flex items-center justify-between text-xl font-semibold border-b p-4">
        <div>Ojrd Gallery</div>
        <div className='flex flex-row gap-4 items-center'>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <SimpleUploadButton />
                <UserButton />
            </SignedIn>
        </div>
      </nav>
    )
  }