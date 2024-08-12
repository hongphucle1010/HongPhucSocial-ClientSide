export function concatFirstAndLastName(
  firstName: string,
  lastName: string
): string {
  return `${firstName} ${lastName}`;
}

export const convertTime = (date: string) => {
  const dateObj = new Date(date);
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const isToday = new Date().toDateString() === dateObj.toDateString();
  const myDate = isToday ? "Today" : dateObj.toLocaleDateString();
  return `${myDate} at ${hours}:${minutes}`;
};

export const getRoomName = (userId1: number, userId2: number) => {
  // Ensure user IDs are strings
  const id1 = String(userId1);
  const id2 = String(userId2);

  // Sort user IDs
  const sortedIds = [id1, id2].sort();

  // Concatenate sorted user IDs
  return `room_${sortedIds[0]}_${sortedIds[1]}`;
};
