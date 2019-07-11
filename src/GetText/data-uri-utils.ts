const noData = (dataUri: string): string => dataUri.split('data:')[1] || '';

export const getExt = (dataUri: string): string | null =>
  (noData(dataUri).split(';')[0] || '').split('/')[1] || null;

export const getData = (dataUri: string): string | null => dataUri.split(';base64,')[1] || null;
