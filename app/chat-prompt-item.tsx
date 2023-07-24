"use client"

import React from "react";
import { ChatPrompt } from './types'
import Link from "next/link";

const ChatPromptItem = ({ data }: { data: ChatPrompt }) => {

  return (
    <Link href={`/chats/${data.slug}`}>
      <div className="h-full card glass">
        <div className="flex-col gap-4 card-body">
          <div className="flex justify-between gap-2">
            <div className="">
              <h2 className="text-sm capitalize card-title">{data.title}</h2>
              <div className="mt-2 space-x-2">
                {data.topic.map((t) => (
                  <span className="badge badge-ghost">{t}</span>
                ))}
              </div>
            </div>

            <div className="card-actions">
              <button className="btn rounded w-16 h-16 flex flex-col items-center  gap-2">
                {data.upvotedBy?.length ?? 0}
                <span className="">
                  🔺
                </span>
              </button>
            </div>
          </div>
          <p className="mt-4 text-sm line-clamp-3  text-neutral-500">{data.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ChatPromptItem;
