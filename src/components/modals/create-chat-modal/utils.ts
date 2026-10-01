export const normalizePhone = (phone: string) => {
  let digits = phone.replace(/\D/g, '');

  if (digits.length === 11 && digits.startsWith('8')) {
    digits = '7' + digits.slice(1);
  }

  if (digits.length === 10) {
    digits = '7' + digits;
  }

  return digits;
};

export const isValidPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, '');

  return /^79\d{9}$/.test(digits) || /^375(25|29|33|44)\d{7}$/.test(digits);
};
