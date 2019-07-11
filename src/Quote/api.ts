import { endpointQuote } from '../config';

import { Quote, IQuoteRequest, example } from './types';

const request = (quote: IQuoteRequest): any => ({
  method: 'POST',
  mode: 'cors',
  body: JSON.stringify(quote, null, 2),
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
  },
});

const delay = (seconds: number) =>
  new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });

export const getQuote = async (quote: IQuoteRequest): Promise<Quote> => {
  try {
    const resp = await fetch(endpointQuote, request(quote));
    if (!resp.ok) {
      throw new Error(resp.status.toString());
    }
    const apiQuote: Quote = await resp.json();
    return apiQuote;
  } catch (e) {
    console.error(e);
    console.warn('there was a quoting error, returning an example quote');
    await delay(3);
    return example;
  }
};
