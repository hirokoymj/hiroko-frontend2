export function api<TResponse>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> {
  return fetch(url, config)
    .then((response) => response.json())
    .then((data) => data as TResponse);
}

export type StatesResponseData = {
  province: string;
  county: string;
  timeline: {
    cases: {};
    deaths: {};
  };
};
