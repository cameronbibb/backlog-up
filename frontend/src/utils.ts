const formatReleaseYear = (timestamp: string): string => {
  if (timestamp) {
    return new Date(Number(timestamp) * 1000).getFullYear().toString();
  } else {
    return "(no release date)";
  }
};

const formatPlatformName = (platformTitle: string): string => {
  return platformTitle.split(" ")[0].toLowerCase();
};

export { formatReleaseYear, formatPlatformName };
