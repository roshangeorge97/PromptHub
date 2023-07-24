import { v4 as uuid } from 'uuid';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import slugify from 'slugify';

export async function POST(req: Request) {
  const session = await getSession();


  const body = await req.json();
  const { title, url, description, topic } = body;

  let slug = slugify(title, { lower: true });
  const existingPost = await prisma.chatPrompt.findUnique({
    where: {
      slug
    }
  });
  if (existingPost) {
    const uniqueId = uuid().slice(0, 4);
    slug += `-${uniqueId}`;
  }

  try {
    const result = await prisma.ChatPrompt.create({
      data: {
        title,
        slug,
        description,
        url,
        topic,
        submittedBy: {
          connect: {
            email: session?.user?.email!
          }
        }
      }
    });
    return new Response(
      JSON.stringify({
        success: true,
        data: result
      })
    );
  } catch (error) {
    // if (error instanceof z.ZodError) {
    //   return new Response(JSON.stringify(error.issues), { status: 422 })
    // }

    // if (error instanceof RequiresProPlanError) {
    //   return new Response("Requires Pro Plan", { status: 402 })
    // }

    console.error(error);
    return new Response(null, { status: 500 });
  }
}
