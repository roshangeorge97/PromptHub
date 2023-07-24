'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { BarsArrowUpIcon, BarsArrowDownIcon } from "@heroicons/react/24/outline";

export const Sorting = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderRef = useRef<HTMLSelectElement>(null)

  return (
    <div className="flex gap-4 items-center">
      <select
        ref={orderRef}
        defaultValue={searchParams.get('sort') || ''}
        className="select select-bordered select-sm md:w-full max-w-xs"
        onChange={() => {
          if (!orderRef.current) return
          const newSearchParams = new URLSearchParams(searchParams)
          newSearchParams.set('sort', orderRef.current.value)
          router.push(`/discover?${newSearchParams}`)
        }}
      >
        <option disabled value="">Sort by</option>
        <option value="recents">Recents</option>
        <option value="upvotes">Upvotes</option>
      </select>
      {searchParams.get('order') === 'asc' && (
        <BarsArrowUpIcon className="cursor-pointer w-6 h-6" onClick={() => {
          const newSearchParams = new URLSearchParams(searchParams)
          newSearchParams.set('order', 'desc')
          router.push(`/discover?${newSearchParams}`)
        }} />
      )}
      {searchParams.get('order') !== 'asc' && (
        <BarsArrowDownIcon className="cursor-pointer w-6 h-6" onClick={() => {
          const newSearchParams = new URLSearchParams(searchParams)
          newSearchParams.set('order', 'asc')
          router.push(`/discover?${newSearchParams}`)
        }} />
      )}
    </div>
  );
}
