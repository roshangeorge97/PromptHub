
export const Placeholder = () => {
  const head = (
    <div className="flex-1 space-y-6 py-1">
      <div className="h-2 bg-slate-400 rounded"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-slate-400 rounded col-span-2"></div>
          <div className="h-2 bg-slate-400 rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-slate-400 rounded"></div>
      </div>
    </div>
  )
  const chat1 = (
    <div className="flex gap-4">
      <div className="rounded-full bg-slate-400 h-10 w-10"></div>
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 bg-slate-400 rounded"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-2 bg-slate-400 rounded col-span-2"></div>
            <div className="h-2 bg-slate-400 rounded col-span-1"></div>
          </div>
          <div className="h-2 bg-slate-400 rounded"></div>
        </div>
      </div>
    </div >
  )
  const chat2 = (
    <div className="flex gap-4">
      <div className="self-end order-last rounded-full bg-slate-400 h-10 w-10"></div>
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 bg-slate-400 rounded"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-2 bg-slate-400 rounded col-span-2"></div>
            <div className="h-2 bg-slate-400 rounded col-span-1"></div>
          </div>
          <div className="h-2 bg-slate-400 rounded"></div>
        </div>
      </div>
    </div>
  )
  const body = (
    <div className="mt-10 flex flex-col gap-8">
      {chat1}
      {chat2}
      {chat1}
    </div>
  )
  const foot = (
    <div className="absolute w-full bottom-0 grid grid-cols-6 gap-4">
      <div className="h-8 bg-slate-400 rounded col-span-5"></div>
      <div className="h-8 bg-slate-400 rounded col-span-1"></div>
    </div>
  )
  return (
    <div className="max-w-[500px] p-10 bg-gray-300 w-full h-full shadow rounded-lg">
      <div className="h-full relative animate-pulse">
        {head}
        {body}
        {foot}
      </div>
    </div>
  )
}
