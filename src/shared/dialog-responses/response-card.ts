export function card(title, subtitle, imageUri, button) {
  return {
    card: {
      title,
      subtitle,
      imageUri,
      butttons: [
        {
          text: button,
          postback: title,
        },
      ],
    },
    platfrom: 'FACEBOOK',
    sendAsMessage: true,
  };
}
