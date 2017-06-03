import fetch from 'isomorphic-fetch';


const clientApiUrl = process.env.NODE_ENV === 'production' ? 'https://fatfisz.com/api' : 'http://localhost:4000';
const serverApiUrl = process.env.NODE_ENV === 'production' ? `https://localhost:${process.env.DATA_SERVER_PORT}` : 'http://localhost:4000';

export default async function fetchApi(body, isServer) {
  const apiUrl = isServer ? serverApiUrl : clientApiUrl;
  const response = await fetch(apiUrl, {
    method: 'POST',
    body,
    headers: {
      'content-type': 'application/graphql',
    },
  });

  if (response.ok) {
    const { data, errors } = await response.json();

    if (errors) {
      throw new Error('Unexpected error :(');
    }
    return data;
  }

  throw new Error('Unexpected error :(');
};
