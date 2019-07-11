import * as React from 'react';
import { Card, Statistic } from 'antd';

import { Wrapper } from './styles';
import { Quote } from './types';

interface IProps {
  quote: Quote;
}

const QuotePanel: React.SFC<IProps> = ({ quote }) => (
  <Wrapper>
    <Card title="Your Quote" style={{ width: 300 }}>
      <div>
        <Statistic title="Monthly Premium (USD)" value={quote.monthlyPremium} precision={2} />
      </div>
      <div>
        {quote.monthlyPremium} &times; 12 months = ${quote.total} annually
      </div>
      <div>
        <em>
          Includes ${quote.taxes} in taxes (before tax annual premium: ${quote.totalBeforeTaxes})
        </em>
      </div>
    </Card>
  </Wrapper>
);

QuotePanel.displayName = 'QuotePanel';

export default QuotePanel;
