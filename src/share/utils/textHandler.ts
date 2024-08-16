export const shortenLongText = (length: number, text?: string) => {
  if (text && text.length >= length && length > 1) {
    return `${text.substring(0, length - 1)}...`;
  }
  return text;
};
