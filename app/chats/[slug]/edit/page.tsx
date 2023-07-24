import { useRedirectIfNotLoggedIn } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ChatForm } from "../../../chat-form";

const EditChatPage = async ({ params }: { params: { slug: string } }) => {
  await useRedirectIfNotLoggedIn()

  const chat = await prisma.chatPrompt.findUnique({
    where: {
      slug: params.slug,
    },
  })

  return (
    <>
      <div className="pt-20">
        <h1 className="text-center text-3xl font-semibold">
          Edit this chat prompt
        </h1>
        <div className="text-center mt-4 text-gray-500">
          We’ll need chat url, title and a short description
        </div>
        <div className="mt-10">
          <ChatForm data={chat} />
        </div>
      </div>
    </>
  );
};

export default EditChatPage;
