import { endpointLicense, endpointVin } from '../config';

const request = (imgData: string): any => ({
  method: 'POST',
  mode: 'cors',
  body: JSON.stringify({ base64: imgData }, null, 2),
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
  },
});

export type ApiLicense = {
  address1: string;
  address2: string;
  dob: string;
  fname: string;
  licenseNumber: string;
  lname: string;
  state: string;
};

export type QuoteFieldsFromLicense = {
  addressLine1: string;
  city: string;
  country: 'US';
  postalCode: string;
  state: string;

  // are these needed?
  dob: string;
  fname: string;
  licenseNumber: string;
  lname: string;
};

export const mapApiLicenseToQuoteFields = (api: ApiLicense): QuoteFieldsFromLicense => {
  const [city, , postalCode] = (api.address2 || '').split(/\s+/);
  return {
    addressLine1: api.address1,
    city,
    country: 'US',
    dob: api.dob,
    fname: api.fname,
    licenseNumber: api.licenseNumber,
    lname: api.lname,
    postalCode,
    state: api.state,
  };
};

export const getLicenseData = async (imgData: string): Promise<QuoteFieldsFromLicense> => {
  const resp = await fetch(endpointLicense, request(imgData));
  if (!resp.ok) {
    throw new Error(resp.status.toString());
  }
  const license: ApiLicense = await resp.json();
  return mapApiLicenseToQuoteFields(license);
};

export type Vin = {
  vin: string;
};

export const getVinData = async (imgData: string): Promise<Vin> => {
  const resp = await fetch(endpointVin, request(imgData));
  if (!resp.ok) {
    throw new Error(resp.status.toString());
  }
  const vin: Vin = await resp.json();
  return vin;
};
