const apiServerPort = process.env.API_SERVER_PORT as string;

export function getAppPort(): number {
  return Number(apiServerPort);
}
