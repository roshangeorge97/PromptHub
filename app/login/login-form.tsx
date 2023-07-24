'use client';

import { Icon } from '@iconify/react';
import { signIn } from 'next-auth/react'

export default function LoginForm() {
  return (
    <>
      <div className="flex w-full flex-col gap-2 p-8">
        <button
          onClick={() => signIn('google')}
          className="btn"
        >
          <Icon icon="flat-color-icons:google" className="mr-4 h-5 w-5" />
          Sign In with Google
        </button>
        <button
          onClick={() => signIn('github')}
          className="btn"
        >
          <Icon icon="mdi:github" className="mr-4 h-5 w-5" />
          Sign In with Github
        </button>

        {/* <div className="divider py-4">
          <span className="opacity-75">OR</span>
        </div> */}

        {/* <button aria-label="Sign up with email">
          <Icons.email className="mr-4 h-5 w-5" />
          Sign up with email
        </button>
        <div className="mt-3 text-center text-xs opacity-75">
          By signing up, you agree to our{' '}
          <a className="link" href="/tos">
            TOS
          </a>{' '}
          <a className="link" href="/privacy-policy">
            Privacy Policy
          </a>
        </div> */}
      </div>
    </>
  )
}