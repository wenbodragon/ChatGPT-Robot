import { Configuration, OpenAIApi } from 'openai'
export async function callOpenAi(content: string): Promise<string> {
  const configuration = new Configuration({
    apiKey: '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'
  })
  const openai = new OpenAIApi(configuration)

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: content }]
  })
  if (completion.data.choices[0].message?.content) {
    return completion.data.choices[0].message.content
  } else {
    return ''
  }
}