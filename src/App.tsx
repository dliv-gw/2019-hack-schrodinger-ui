import React from 'react';

import './App.css';
import Main from './Main';
import Form from './Form';
import QuotePanel from './Quote';
import { Quote } from './Quote/types';

interface IProps {}

const App: React.SFC<IProps> = () => {
  const [quote, setQuote] = React.useState<Quote | null>(null);

  return (
    <Main>
      <section>{quote ? <QuotePanel quote={quote} /> : <Form setQuote={setQuote} />}</section>
    </Main>
  );
};

App.displayName = 'App';

export default App;
