// export const formattedPrice = (price) => {
//   return price?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
// };
export const formattedPrice = (price) => {
  // Ensure the price is a number before formatting
  const numericPrice = Number(price);

  // Handle cases where price is not a valid number (e.g., NaN)
  if (isNaN(numericPrice)) {
    return '0.00';  // Default to 0.00 if the price is invalid
  }

  // Format the price to 2 decimal places
  return numericPrice.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};
