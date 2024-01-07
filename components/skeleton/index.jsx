import React from 'react'

const Skeleton = () => {
  return (
    <div className="container my-4">
      <div className="flex space-x-4 animate-pulse">
        <div className="w-10 h-10 rounded-full bg-slate-300"></div>
        <div className="flex-1 py-1 space-y-6">
          <div className="h-5 rounded bg-slate-300"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-3 col-span-2 rounded bg-slate-300"></div>
              <div className="h-3 col-span-1 rounded bg-slate-300"></div>
            </div>
            <div className="h-3 rounded bg-slate-300"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skeleton
