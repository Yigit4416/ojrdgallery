"use client";

import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';
import { UploadButton } from '~/utils/uploadthing'

// justify-between sayesinde bu iki div arası açıldı
export default function TopNav() {
  // next/navigation'dan çektiğine dikakt et
    const router = useRouter();

    return(
      <nav className="flex items-center justify-between text-xl font-semibold border-b p-4">
        <div>Ojrd Gallery</div>
        <div className='flex flex-row'>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UploadButton endpoint="imageUploader"
                onClientUploadComplete={() => {router.refresh()}} />
                <UserButton />
            </SignedIn>
        </div>
      </nav>
    )
  }