import { PrismaClient } from '@prisma/client/edge'
const prisma = new PrismaClient()

addEventListener('fetch', (event) => {
  event.respondWith(handleEvent(event))
})

async function handleEvent(event: FetchEvent): Promise<Response> {
  const { request } = event

  // waitUntil method is used for sending logs, after response is sent
  event.waitUntil(
    prisma.log
      .create({
        data: {
          level: 'Info',
          message: `${request.method} ${request.url}`,
          meta: {
            headers: JSON.stringify(request.headers),
          },
        },
      })
      .then()
  )

  return new Response(`request method: ${request.method}!`)
}