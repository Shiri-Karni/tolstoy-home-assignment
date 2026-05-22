/**
 * Builds Tolstoy platform “new chat” URLs with a pre-filled implementation prompt.
 */
const TOLSTOY_NEW_CHAT_URL = 'https://platform.gotolstoy.com/new-chat'

/**
 * @param {{ title: string, description: string, tolstoyProduct: string, storeName: string }} params
 */
export function buildGenerateChatUrl({ title, description, tolstoyProduct, storeName }) {
  const prompt = [
    `I want to set up "${title}" for ${storeName} using Tolstoy ${tolstoyProduct}.`,
    description,
    'What are the steps to implement this on my Shopify store?',
  ].join(' ')

  const url = new URL(TOLSTOY_NEW_CHAT_URL)
  url.searchParams.set('prompt', prompt)
  return url.toString()
}
