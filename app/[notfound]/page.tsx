// TODO: This is a workaround for a bug in Next.js 13.0.0
// https://stackoverflow.com/questions/75302340/not-found-page-does-not-work-in-next-js-13

import { notFound } from "next/navigation"

export default function NotFoundCatchAll() {
  return notFound()
}