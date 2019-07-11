import React from 'react';

import './App.css';
import Main from './Main';
import Form from './Form';

interface IProps {}

const App: React.SFC<IProps> = () => {
  return (
    <Main>
      <section>
        <Form />
      </section>
    </Main>
  );
};

App.displayName = 'App';

export default App;
