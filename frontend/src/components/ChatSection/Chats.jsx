import React from 'react'
import UserChat from './UserChat.jsx'
import ModelChat from './ModelChat.jsx'
import Navbar from './Navbar.jsx'
import InputSection from './InputSection.jsx'
import { useSelector} from 'react-redux'


export default function Chats(props) {
  
  const file = useSelector((state) => state.file.value)
  

  return (
    <>
      <div 
      className='relative h-full w-full flex flex-col items-center overflow-auto'
      >
        <Navbar/>
            {
              !file.content && <div className='h-full w-full flex items-center justify-center text-xl text-gray-300/50'>
                No file choosen..
              </div>
            }
            {
              file.content?.map((item, index) => (
                <div key={index} className='w-full'>
                  { item.role==="user" && <UserChat text={item.parts[0].text}/>}
                  { item.role==="model" && <ModelChat text={item.parts[0].text}/>}
                </div>
              ))
            }   
        { file.content && <InputSection/>}           
            {/* <div ref={messageRef}>hii</div> */}
      </div>
    </>
  )
}
