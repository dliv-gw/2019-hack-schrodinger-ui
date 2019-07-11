import { getData, getExt } from './data-uri-utils';

const example = `data:image/png;base64,iVBORw0KGgoAAA`;

test('getData', () => {
  expect(getData(example)).toBe('iVBORw0KGgoAAA');
});

test('getExt', () => {
  expect(getExt(example)).toBe('png');
});
