import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import * as z from 'zod';

const routeContextSchema = z.object({
  params: z.object({
    id: z.string()
  })
});

export async function POST(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    const session = await getSession();
    if (!session) {
      return new Response(null, { status: 401 });
    }

    if (await hasUnsaved(params.id)) {
      return new Response('already unsaved', { status: 422 });
    }

    await prisma.chatPrompt.update({
      where: {
        id: params.id
      },
      data: {
        savedBy: {
          disconnect: {
            email: session.user.email
          }
        }
      }
    });
    await prisma.user.update({
      where: {
        email: session.user.email
      },
      data: {
        savedPrompts: {
          disconnect: {
            id: params.id
          }
        }
      }
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'unsaved'
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    console.log('error\n', error);

    return new Response(null, { status: 500 });
  }
}

async function hasUnsaved(id: string) {
  const session = await getSession();
  const count = await prisma.chatPrompt.count({
    where: {
      id,
      savedBy: {
        some: {
          id: session?.user?.id
        }
      }
    }
  });

  return count === 0;
}
