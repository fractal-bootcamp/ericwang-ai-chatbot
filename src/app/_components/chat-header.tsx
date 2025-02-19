import React from 'react'
import { Button } from '~/components/ui/button'
import { SignInButton } from '@clerk/nextjs'

export default function ChatHeader() {
  return (
    <header className='flex sticky top-0 py-1.5 items-center px-2 md:px-2 gap-2'>
        <SignInButton>
            <span className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 cursor-pointer'>Sign in</span>
        </SignInButton>
    </header>
  )
}