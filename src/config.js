// See https://confluence.guidewire.com/display/~dupdike/Schrodinger%27s+Parser
// if the OCR lambdas change input / output schema then the webapp code will need to change accordingly
// update types at src/GetText/api.ts and fix errors, TypeScript will complain until everything matches again

export const endpointLicense =
  'https://nwg45cfrc0.execute-api.us-east-1.amazonaws.com/v1/licenseparser';

export const endpointVin = 'https://nwg45cfrc0.execute-api.us-east-1.amazonaws.com/v1/parsevin';

export const endpointQuote = 'todo';
