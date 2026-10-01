export const getPreparedName = (name: string) => {
  return name.replace(/^\+/, '').trim().charAt(0).toUpperCase() || '?';
};

export const getColor = (value: string) => {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) | 0;
  }

  return `hsl(${Math.abs(hash) % 360}, 65%, 60%)`;
};
