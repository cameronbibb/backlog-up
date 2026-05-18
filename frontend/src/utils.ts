const formatReleaseYear = (timestamp: string): string => {
  if (timestamp) {
    return new Date(Number(timestamp) * 1000).getFullYear().toString();
  } else {
    return "(no release date)";
  }
};

export { formatReleaseYear };
