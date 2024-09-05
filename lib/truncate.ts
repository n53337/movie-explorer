export const truncateText = (string: string, maxLength: number = 50): string =>
  string.length > maxLength ? `${string.substring(0, maxLength)}…` : string;
