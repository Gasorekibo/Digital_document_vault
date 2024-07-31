export function dateFormat(date) {
  const dateObj = new Date(date);
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const formattedTime = formatter.format(dateObj);
  const month = dateObj.toLocaleString('default', { month: 'long' });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const time = formattedTime;
  return `${month} ${day}, ${year} ${time}`;
}
