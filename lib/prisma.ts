import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  let globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient
  }
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient(/*{ log: ['info', 'query'] }*/)
  }
  prisma = globalWithPrisma.prisma
}

prisma.$use(async (params, next) => {
  if (params.action == "create" && params.model == "Account") {
    delete params.args.data["not-before-policy"]
  }

  const result = await next(params)
  // See results here
  return result
})

export default prisma
