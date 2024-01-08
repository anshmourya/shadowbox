import React, { useState } from 'react'
import { P } from '../typograph'
const SHOW_MORE = ' show More...'
const SHOW_LESS = ' show Less'
const ReadmoreText = ({ text, maxLength }) => {
  const [showMore, setShowMore] = useState(false)
  return (
    <P>
      {showMore ? text : `${text.substring(0, maxLength)}`}
      <span
        onClick={() => setShowMore(!showMore)}
        className="text-blue-500 cursor-pointer"
      >
        {showMore ? SHOW_LESS : SHOW_MORE}
      </span>
    </P>
  )
}

export default ReadmoreText
