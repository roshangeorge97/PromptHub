'use client'

import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { UserProfile } from "../../types"

export default function UserCard({ data: user, popover }: { user: UserProfile, popover?: boolean }) {
  return (
    <div className={cn("flex flex-col gap-4 items-center", {
      "md:flex-row md:gap-8": !popover,
    })}>
      <div className="avatar">
        <div className={cn("rounded-full", {
          "w-16": popover,
          "w-36": !popover,
        })}>
          <img src={user.image} alt="" />
        </div>
      </div>
      <div className={cn("flex-1 w-full text-center", {
        "md:text-left": !popover,
      })}>
        <div className={cn("text-semibold", {
          "text-3xl": !popover,
        })}>{user.name}</div>
        <div className="text-gray-500">@{user.username}</div>
        <div className="mt-4">{user.bio}</div>
        <div className="mt-4">
          {user.websites[0] && (
            <div className="flex gap-2 items-center text-sm">
              <Icon icon="mdi:web" />
              <a href={user.websites[0]}>{user.websites[0]}</a>
            </div>
          )}
          {user.websites[1] && (
            <div className="flex gap-2 items-center text-sm">
              <Icon icon="mdi:twitter" />
              <a href={user.websites[1]}>{user.websites[1]}</a>
            </div>
          )}
          {user.websites[2] && (
            <div className="flex gap-2 items-center text-sm">
              <Icon icon="mdi:linkedin" />
              <a href={user.websites[2]}>{user.websites[2]}</a>
            </div>
          )}
        </div>
        {popover && (
          <div className="mt-4">
            <Link legacyBehavior href={`/user/${user.username}`}>
              <a className='btn w-full'>
                Visit
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}