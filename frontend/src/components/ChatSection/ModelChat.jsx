import React from 'react'

export default function ModelChat(props) {
    const text=props.text
    return (
      <div className='w-full flex'>
        <div 
        className='bg-transparent w-full box-border mx-[5%] my-2 px-3 py-2 break-words rounded'
        >
          {text}
        </div>
      </div>
    )
}
