import { mapApiLicenseToQuoteFields, ApiLicense, QuoteFieldsFromLicense } from './api';

const exampleApi: ApiLicense = {
  address1: '918 N ROXBURY',
  address2: 'BEVERLY CA 90210',
  dob: '08/06/1911',
  fname: 'LUCILLE',
  licenseNumber: 'B2201793',
  lname: 'BALL',
  state: 'CALIFORNIA',
};

const expectedQuote: QuoteFieldsFromLicense = {
  addressLine1: '918 N ROXBURY',
  city: 'BEVERLY',
  country: 'US',
  dob: '08/06/1911',
  fname: 'LUCILLE',
  licenseNumber: 'B2201793',
  lname: 'BALL',
  postalCode: '90210',
  state: 'CALIFORNIA',
};

test('works', () => {
  expect(mapApiLicenseToQuoteFields(exampleApi)).toEqual(expectedQuote);
});
