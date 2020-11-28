const clientApiUrl =
  process.env.NODE_ENV === 'production' ? 'https://fatfisz.com/api' : 'http://localhost:3000/api';
const serverApiUrl =
  process.env.NODE_ENV === 'production'
    ? `http://localhost:${process.env.SERVER_PORT}/api`
    : 'http://localhost:3000/api';

export async function fetchApi<Result>(path: string, isServer: boolean): Promise<Result> {
  const apiUrl = isServer ? serverApiUrl : clientApiUrl;
  const response = await fetch(`${apiUrl}${path}`);

  if (response.ok) {
    const { data, errors } = await response.json();

    if (errors) {
      if (process.env.NODE_ENV !== 'production') {
        console.log(errors);
      }
      throw new Error('Unexpected error :(');
    }
    return data;
  }

  throw new Error('Unexpected error :(');
}
