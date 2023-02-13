// Truncate the description to a certain length
export const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};

export const calculateDiscountPrice = (amount, percentage) => {
  const discount = (amount / 100) * (100 - percentage);
  return discount.toFixed(2);
};
