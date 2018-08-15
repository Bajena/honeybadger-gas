import { ErrorData } from '../src/error-data';

describe('ErrorData', () => {
  describe('when initializing from a string', () => {
    it('works', () => {
      const ed = new ErrorData('xxx');

      expect(ed.name).toEqual('Error');
      expect(ed.message).toEqual('xxx');
    });
  });

  describe('when initializing from an error', () => {
    it('works', () => {
      const error = new Error('xxx');
      const ed = new ErrorData(error);

      expect(ed.name).toEqual('Error');
      expect(ed.message).toEqual('xxx');
      expect(ed.stack).toEqual(expect.stringContaining('at Object.'));
    });
  });
});
