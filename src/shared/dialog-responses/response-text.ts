export function text(texts: string) {
  return {
    fulfillmentMessages: [{ text: { text: [texts] } }],
  };
}
