import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return new Response('Unauthorized', { status: 403 });
    }

    const body = await req.json();
    const { username } = body;

    const count = await prisma.user.count({
      where: {
        username,
        NOT: {
          id: session.user.id
        }
      }
    });
    if (count > 0) {
      return new Response('Username already exists', { status: 422 });
    }

    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    console.error(error);
    return new Response('Server upload error', { status: 500 });
  }
}
