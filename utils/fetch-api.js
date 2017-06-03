import fetch from 'isomorphic-fetch';


const apiUrl = process.env.NODE_ENV === 'production' ? 'https://fatfisz.com/api' : 'http://localhost:4000';

export default async function fetchApi(body) {
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
