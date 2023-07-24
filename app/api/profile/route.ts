import cloudinary from '@/lib/cloudinary';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';

// FormData didn't work for me, so I used a JSON body instead
// https://github.com/vercel/next.js/discussions/48164
export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return new Response('Unauthorized', { status: 403 });
    }

    const body = await req.json();
    const { username, bio, image, websites } = body;

    let uploadedImage;
    if (image) {
      const { secure_url } = await cloudinary.uploader.upload(image);
      uploadedImage = secure_url;
    }

    const result = await prisma.user.update({
      where: {
        email: session.user.email
      },
      data: {
        username,
        bio,
        websites,
        image: uploadedImage
      }
    });
    return new Response(JSON.stringify({ data: result }));
  } catch (error) {
    console.error(error);
    return new Response('Server upload error', { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return new Response('Unauthorized', { status: 403 });
    }

    const result = await prisma.user.findFirst({
      where: { email: session.user.email }
    });
    return new Response(JSON.stringify({ data: result }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 500 });
  }
}

// async function base64Encode(blob: Blob): Promise<string> {
//   const buffer = Buffer.from(await blob.text());
//   return 'data:' + blob.type + ';base64,' + buffer.toString('base64');
// }
