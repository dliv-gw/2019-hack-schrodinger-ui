import React from 'react';
import { Alert } from 'antd';

import { getLicenseData, getVinData, QuoteFieldsFromLicense } from './api';
import { getData } from './data-uri-utils';
import { Wrapper } from './styles';

type DocType = 'license' | 'vin';

interface IProps {
  docType: DocType;
  // ugly, would be better to make this component generic on <License|Vin>
  onLicenseSubmit?: (license: QuoteFieldsFromLicense) => void;
  onVinSubmit?: (text: string) => void;
}

const GetText: React.SFC<IProps> = ({ docType, onLicenseSubmit, onVinSubmit }) => {
  const [dataUri, setDataUri] = React.useState<string | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const [isFetching, setIsFetching] = React.useState(false);

  return (
    <Wrapper>
      {error && <Alert type="error" message="Error" description={error.message} />}
      <input
        type="file"
        disabled={isFetching}
        accept=".jpg,.jpeg,.png"
        onChange={function({ target: { files } }) {
          setDataUri(null);
          setError(null);
          setIsFetching(false);

          const file = files && files[0];
          if (!file) {
            return;
          }
          const FR = new FileReader();
          FR.addEventListener('load', async (e: any) => {
            const newDataUri = e.target.result;
            setDataUri(newDataUri);
            try {
              setIsFetching(true);
              const data = getData(newDataUri);
              if (!data) {
                throw new Error('no data in uri');
              }
              switch (docType) {
                case 'license': {
                  const license = await getLicenseData(data);
                  if (onLicenseSubmit) {
                    onLicenseSubmit(license);
                  } else {
                    throw new Error('missing onLicenseSubmit');
                  }
                  break;
                }
                case 'vin': {
                  const vin = await getVinData(data);
                  if (onVinSubmit) {
                    onVinSubmit(vin.vin);
                  } else {
                    throw new Error('missing onVinSubmit');
                  }
                  break;
                }
                default:
                  throw new Error(`unexpected-case-${docType}`);
              }
            } catch (e) {
              console.error(e);
              setError(e);
              setIsFetching(false);
            }
          });
          FR.readAsDataURL(file);
        }}
      />
      {dataUri && (
        <div>
          <img src={dataUri} height={150} />
        </div>
      )}
    </Wrapper>
  );
};

GetText.displayName = 'GetText';

export default GetText;
