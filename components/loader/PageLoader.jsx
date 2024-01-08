import React from 'react'
import Skeleton from '../skeleton'

const PageLoader = () => {
  return (
    <div className="grid gap-5 max-w-[1000px] container">
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  )
}

export default PageLoader
