// import { Configuration, OpenAIApi } from 'openai'
// export function callOpenAi(content: string) {
//   const configuration = new Configuration({
//     apiKey: import.meta.env.VITE_APP_KEY,
//   })

//   const openai = new OpenAIApi(configuration)

//   const completion = openai.createChatCompletion({
//     model: 'gpt-3.5-turbo',
//     stream:true,
//     messages: [{ role: 'user', content: content }]
//   })
//   console.log("completion",completion);
//   return completion
  
//   // if (completion.data.choices[0].message?.content) {
//   //   return completion.data.choices[0].message.content
//   // } else {
//   //   return ''
//   // }
// }

// export function callOpenAi(content: string) {
//   const xhr = new XMLHttpRequest();
//   xhr.open("POST","https://api.openai.com/v1/chat/completions");
//   // xhr.setRequestHeader('Content-Type', 'stream');
//   xhr.setRequestHeader('Authorization', `Bearer sda`);

//   xhr.send(JSON.stringify({"model": "gpt-3.5-turbo","stream":true,
//   "messages": [{"role": "user", "content": content}]}));
//   xhr.onload = function(){
//     console.log(xhr.response);
    
//   }

// }
export function callOpenAi(content:any){
  return fetch(
    "https://api.openai.com/v1/chat/completions", {
    method: "POST",
    // timeout: 10000,
    body: JSON.stringify(
      {"model": "gpt-3.5-turbo","stream":true,
      "messages": [{"role": "user", "content":content}]
    }),
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_APP_KEY}`,
      "Content-Type": "application/json"
    },
  })
}