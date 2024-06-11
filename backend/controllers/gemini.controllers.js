import {asyncHandler} from '../utils/asyncHandler.js';
import {GoogleGenerativeAI} from '@google/generative-ai';
import {JSDOM} from 'jsdom'

let genAi=null,model=null;

const init =()=>{
    genAi= new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    model=genAi.getGenerativeModel({model:"gemini-1.5-flash"});
}

const generate=asyncHandler(async (req,res)=>{
    if(model===null)
            init();
    const prompt = `${req.body.input}`//;req.body.input + " Provide your response in html format like heading and bold characters"
    const history=req.body.history
    const chat=model.startChat({
        history:history
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    var text = response.text();
    res.status(200).json({
        message:text
    })
})

export {init,generate}