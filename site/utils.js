export const secondsToDhms = (seconds) => {
  seconds = Number(seconds);

  const y = Math.floor(seconds / 31536000);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const durationComponents = [
    { label: y === 1 ? "year" : "years", count: y },
    { label: d === 1 ? "day" : "days", count: d },
    { label: h === 1 ? "hour" : "hours", count: h },
    { label: m === 1 ? "minute" : "minutes", count: m },
    { label: s === 1 ? "second" : "seconds", count: s },
  ];

  const stringDisplay = durationComponents
    .filter((item) => item.count > 0)
    .splice(0, 2)
    .map((item) => `${item.count} ${item.label}`)
    .join(", ");

  return stringDisplay;
};
