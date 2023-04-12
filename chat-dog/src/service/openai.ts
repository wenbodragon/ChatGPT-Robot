import { Configuration, OpenAIApi } from 'openai'
export async function callOpenAi() {
  const configuration = new Configuration({
    apiKey: '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'
  })
  const openai = new OpenAIApi(configuration)

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: '写首诗赞美联影医疗' }]
  })
  console.log(completion.data.choices[0].message)
}
