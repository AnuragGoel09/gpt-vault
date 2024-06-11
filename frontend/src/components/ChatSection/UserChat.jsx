import React from 'react'

export default function UserChat(props) {
    const text=props.text
  return (
    <div className='w-full flex justify-end'>
      <div className='bg-violet-700 box-border max-w-[60%] mx-[5%] my-4 px-3 py-2 break-words rounded'>
        {text}
      </div>
    </div>
  )
}