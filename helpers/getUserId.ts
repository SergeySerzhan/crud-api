export function getUserId(url: string): string {
  const startIndex = url.lastIndexOf('/');
  return url.slice(startIndex + 1);
}
