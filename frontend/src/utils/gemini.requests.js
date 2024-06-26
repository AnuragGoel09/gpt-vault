import axios from 'axios'
import {serverUrl} from '../constants.js'

const generate=async(input,history,accesstoken)=>{
    let output=""
    const response=await axios.post(`${serverUrl}/api/v1/gemini/generate`,{
        input:input,
        history:history
    },{
        headers: {
            'Authorization': `Bearer ${accesstoken}`
        }
    })
    .then(response =>{
        output=response.data.message
    })
    .catch(error => console.error('Axios error:', error));
    return output
}

export {
    generate
}