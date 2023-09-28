const hostUrl = process.env.SERVER_HOST_URL as string;

export function getAppHost(): string {
  return hostUrl;
}
