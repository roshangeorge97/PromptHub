import React from "react";
import prisma from '@/lib/prisma'
import ChatPromptItem from "./chat-prompt-item";
import { Comments } from "./comments";

const ChatDetailsPage = async ({ params }: {
  params: {
    slug: string
  }
}) => {
  const chat = await prisma.chatPrompt.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      upvotedBy: true,
      savedBy: { select: { email: true } },
      submittedBy: {
        select: {
          username: true,
          name: true,
          email: true,
          image: true,
          bio: true,
          websites: true,
        },
      },
    },
  });

  if (!chat) {
    return (
      <div className="pt-32 text-center">
        Chat not found
      </div>
    )
  }

  return (
    <div className="pt-20">
      <ChatPromptItem data={chat} />
      <Comments />
    </div>
  );
};

export default ChatDetailsPage;
