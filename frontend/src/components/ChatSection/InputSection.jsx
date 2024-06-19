import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import StopIcon from '@mui/icons-material/Stop';
import { generate } from '../../utils/gemini.requests.js';
import { useSelector, useDispatch } from 'react-redux'
import { updateChat } from '../../redux/fileSlice.js';
import CircularProgress from '@mui/material/CircularProgress';
export default function InputSection(props) {

  const [input,setInput]=useState("")
  const [output,setOutput]=useState("")
  const [sending,setSending]=useState(false)
  const file = useSelector((state) => state.file.value)
  const user=useSelector((state)=> state.user.value)
  const dispatch = useDispatch()

  const handleHeight = (event)=>{
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
    setInput(event.target.value)
  }

  const handleSend =async()=>{
    setSending(true)
      const out=await generate(input,file.content,user.accesstoken)
      if(out==""){
        setSending(false)
        return
      }

      dispatch(updateChat({
        content:[
          {
            role:"user",
            parts:[{text:input}]
            
          },
          {
            role:"model",
            parts:[{text:out}]
          }
        ],
        accesstoken:user.accessToken
      }))
      setSending(false)
      setInput("")
  }
  return (
    <div className='w-full sticky bottom-0 bg-transparent'>
        <div 
        className='max-w-[60%] m-auto mb-5 flex bg-zinc-800 px-10 items-center justify-center rounded-tl-[20px] rounded-bl-[20px] rounded-br-[20px] rounded-tr-[20px] relative'
        >    
            {
              !sending && 
                <textarea 
                value={input}
                placeholder='Type message here'
                className='w-full h-15 p-5 rounded-full outline-none border-none overflow-hidden bg-transparent resize-none' 
                onChange={handleHeight}
                />
            }
            {
              sending && 
              <div
              className='min-h-15 w-full p-5 rounded-full overflow-hidden bg-transparent'
              >
                {input}
              </div>
            }
            
            
            <div
            className='absolute right-3 bottom-3 rounded-full bg-violet-700 p-2 flex justify-center items-center cursor-pointer'
            >
             {
              !sending && <SendIcon onClick={handleSend}/> 
             } 
             {
              sending && <CircularProgress color='inherit' size={'20px'}/>
             } 
            </div>
        
        </div>
    </div>
  )
}
