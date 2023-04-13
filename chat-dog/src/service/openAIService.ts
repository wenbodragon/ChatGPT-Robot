import { Configuration, OpenAIApi } from 'openai'
console.log(import.meta.env);

export async function callOpenAi(content: string) {
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_APP_KEY,
  })
  console.log(import.meta.env.VITE_APP_KEY);

  const openai = new OpenAIApi(configuration)

  // const completion = await openai.createChatCompletion({
  //   model: 'gpt-3.5-turbo',
  //   messages: [{ role: 'user', content: content }]
  // })
  // if (completion.data.choices[0].message?.content) {
  //   return completion.data.choices[0].message.content
  // } else {
  //   return ''
  // }
}
