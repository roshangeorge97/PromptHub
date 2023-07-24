import React from "react";
import prisma from "@/lib/prisma";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import ChatPromptItem from "../chat-prompt-item";
import { Sorting } from "./sorting";

const DiscoverChatsPage = async ({
  searchParams
}: {
  searchParams: {
    q?: string
    sort?: string
    order?: string
  }
}) => {
  const chats = await prisma.chatPrompt.findMany({
    where: {
      title: {
        contains: searchParams.q,
        mode: 'insensitive',
      }
    },
    include: {
      upvotedBy: true,
      submittedBy: true,
    },
    orderBy: {
      ...(searchParams.sort === 'recents' && {
        createdAt: searchParams.order === 'asc' ? 'asc' : 'desc'
      }),
      ...(searchParams.sort === 'upvotes' && {
        upvotedBy: {
          _count: searchParams.order === 'asc' ? 'asc' : 'desc'
        }
      })
    }
  });

  return (
    <>
      <div className="pt-20">
        <h1 className="text-center text-2xl md:text-5xl font-bold">Discover Prompts</h1>
        <div className="mt-10 text-xl text-gray-500">
          <form>
            <div className="form-control">
              <div className="justify-center input-group">
                <input name="q" type="text" placeholder="Search…" className="w-full md:w-1/2 input input-bordered" />
                <button className="btn btn-square">
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="mt-10 md:mt-[80px]">
          <Sorting />
          <main className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...chats].map((chat, index) => {
              return (
                <div key={chat.id} className="mx-auto w-full h-full">
                  <ChatPromptItem data={chat} />
                </div>
              )
            })}
          </main>
        </div>
      </div>
    </>
  );
};

export default DiscoverChatsPage;
