export const formatDates = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export function CapitalizeWords(input: string) {
  let words = input.split(" ");

  for (let i = 0; i < words.length; i++) {
    if (words[i]) {
      words[i] =
        words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
    }
  }
  return words.join(" ");
}

export function formatTime(seconds: number) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export function convertToEAT(date: Date) {
  // Clone the date and add 3 hours for EAT (UTC+3)
  const eatTime = new Date(date);
  eatTime.setHours(eatTime.getUTCHours() + 3);
  return eatTime;
};
