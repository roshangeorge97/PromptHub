import { getSession } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BoltIcon, StarIcon, ShareIcon } from "@heroicons/react/24/outline";

export default async function Page() {
  const session = await getSession()
  if (session) {
    return redirect('/discover')
  }

  return (
    <div className="">
      <main>
        <div className="relative overflow-hidden isolate">
          <div
            className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
            aria-hidden="true"
          >

          </div>
          <div className="px-6 py-10 mx-auto max-w-7xl lg:px-8">
            <div className="max-w-3xl mx-auto text-center lg:pt-8">
              <h1 className="capitalize mt-20 text-4xl font-bold tracking-tight  sm:text-6xl">
                Find your next favorite ChatGPT prompt.
              </h1>
              <p className="mt-4 text-lg font-medium leading-8 text-gray-500">
                Discover, curate and share ChatGPT prompts all in one place.
              </p>
              <button className="text-lg my-8 btn btn-primary capitalize bg-indigo-600 text-white w-full max-w-xs h-16 hover:bg-indigo-700">
                <Link href="/discover">
                  Start Discovering
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="mb-12 h-[500px] bg-center bg-[url(https://images.unsplash.com/photo-1675865254433-6ba341f0f00b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)] bg-cover"></div>
        <div className="px-6 mx-auto mt-20 max-w-7xl sm:mt-0 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-base font-semibold leading-7 text-gray-500">
              Empower with smart tools
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight  sm:text-4xl">
              Learning AI and become better together.
            </p>
          </div>
          <div className="max-w-2xl mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 ">
                  <div className="flex items-center justify-center w-10 h-10 mb-6 bg-indigo-500 rounded-lg">
                    <BoltIcon className="w-6 h-6" />
                  </div>
                  Discover
                </dt>
                <dd className="flex flex-col flex-auto mt-1 text-base leading-7 text-gray-500">
                  <p className="flex-auto">
                    Discover interesting ChatGPT prompts from the community.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 ">
                  <div className="flex items-center justify-center w-10 h-10 mb-6 bg-indigo-500 rounded-lg">
                    <StarIcon className="w-6 h-6" />
                  </div>
                  Curate
                </dt>
                <dd className="flex flex-col flex-auto mt-1 text-base leading-7 text-gray-500">
                  <p className="flex-auto">
                    Curate ChatGPT prompts that reasonate with you.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 ">
                  <div className="flex items-center justify-center w-10 h-10 mb-6 bg-indigo-600 rounded-lg">
                    <ShareIcon className="w-6 h-6" />
                  </div>
                  Share
                </dt>
                <dd className="flex flex-col flex-auto mt-1 text-base leading-7 text-gray-500">
                  <p className="flex-auto">
                    Share your amazing ChatGPT prompts with the community.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
    </div>
  )
}