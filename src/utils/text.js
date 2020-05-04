export const formatBrewed = (text) => {
  const brewed = text.split('/');
  return {
    month: parseInt(brewed[0]),
    year: parseInt(brewed[1]),
  };
};

export const shortText = (text, numCharacters) => {
  return text.length > numCharacters
    ? `${text.substring(0, numCharacters)}...`
    : text;
};
