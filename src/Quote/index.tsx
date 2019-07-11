import * as React from 'react';

import { Quote } from './types';

interface IProps {
  quote: Quote;
}

const QuotePanel: React.SFC<IProps> = ({ quote }) => (
  <div>
    <div>
      $<strong>{quote.monthlyPremium}</strong>per month
    </div>
  </div>
);

QuotePanel.displayName = 'QuotePanel';

export default QuotePanel;
