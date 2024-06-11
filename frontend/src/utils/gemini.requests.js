import axios from 'axios'

const generate=async(input,history,accesstoken)=>{
    console.log(accesstoken)
    let output=""
    const response=await axios.post("http://localhost:8000/api/v1/gemini/generate",{
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