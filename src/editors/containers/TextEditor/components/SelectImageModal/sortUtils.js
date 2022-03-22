export const sortOptions = StrictDict({
  dateAscending: 'By date added (newest)'
  //...
});
export const OPTIONS = [
  sortOptions.dateAscending,

]
export const OPTIONS = [
  'By date added (newest)',
  'By date added (oldest)',
  'By name (ascending)',
  'By name (descending)',
];

export const dateNewest = (a, b) => b.sortDate - a.sortDate;

export const dateOldest = (a, b) => a.sortDate - b.sortDate;

export const nameAscending = (a, b) => {
  const nameA = a.displayName.toLowerCase();
  const nameB = b.displayName.toLowerCase();
  if (nameA < nameB) { return -1; }
  if (nameB < nameA) { return 1; }
  return b.sortDate - a.sortDate;
};

export const nameDescending = (a, b) => {
  const nameA = a.displayName.toLowerCase();
  const nameB = b.displayName.toLowerCase();
  if (nameA < nameB) { return 1; }
  if (nameB < nameA) { return -1; }
  return b.sortDate - a.sortDate;
};