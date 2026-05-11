const BASE_URL = "https://nestjs-pokedex-api.vercel.app";

const api = {
  get: <T>(path: string): Promise<T> =>
    fetch(`${BASE_URL}${path}`)
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        return res.json() as Promise<T>;
      })
      .catch((err) => {
        throw err;
      }),
};


export default api;
