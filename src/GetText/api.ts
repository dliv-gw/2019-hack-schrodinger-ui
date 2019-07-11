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

export type License = {
  state: string;
  fname: string;
  lname: string;
  address1: string;
  address2: string;
  dob: string;
  licenseNumber: string;
};

export const getLicenseData = async (imgData: string): Promise<License> => {
  const resp = await fetch(endpointLicense, request(imgData));
  if (!resp.ok) {
    throw new Error(resp.status.toString());
  }
  const license: License = await resp.json();
  return license;
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
