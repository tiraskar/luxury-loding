export const formateDate = (date) => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return '';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const getRelativeDateOrTime = (dateTime) => {
  const now = new Date();
  const insertedDate = new Date(dateTime);
  const diffInSeconds = Math.floor((now - insertedDate) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30); // Approximate
  const diffInYears = Math.floor(diffInDays / 365); // Approximate

  if (diffInYears > 1) {
    return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ${diffInMonths % 12} month${(diffInMonths % 12) > 1 ? 's' : ''} ago`;
  }
  if (diffInYears === 1) {
    return `1 year ${diffInMonths % 12} month${(diffInMonths % 12) > 1 ? 's' : ''} ago`;
  }
  if (diffInMonths > 1) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  }
  if (diffInDays > 1) {
    const hours = diffInHours % 24;
    return `1 day ${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  if (diffInDays === 1) {
    return `1 day ${diffInHours % 24} hour${(diffInHours % 24) > 1 ? 's' : ''} ago`;
  }
  return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
};