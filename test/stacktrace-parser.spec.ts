import { StacktraceParser } from '../src/stacktrace-parser';

describe('StacktraceParser', () => {
  describe('when stack contains unparsable line', () => {
    it('filters out the line', () => {
      const stack = 'Error: xxx\n' + 'at Kod:1 (myFunction)\n';
      'randomStuff';
      const parser = new StacktraceParser(stack);
      const entries = parser.parse();

      expect(entries.length).toEqual(1);
      expect(entries[0].functionName).toEqual('myFunction');
      expect(entries[0].fileName).toEqual('Kod');
      expect(entries[0].lineNumber).toEqual(1);
    });
  });

  describe('when stack is correct', () => {
    it('parses correctly', () => {
      const stack = 'Error: xxx\n' + 'at Kod:1 (myFunction)\n' + 'at Kod:3';

      const parser = new StacktraceParser(stack);
      const entries = parser.parse();

      expect(entries.length).toEqual(2);
      expect(entries[0].functionName).toEqual('myFunction');
      expect(entries[0].fileName).toEqual('Kod');
      expect(entries[0].lineNumber).toEqual(1);
      expect(entries[1].functionName).toEqual('');
      expect(entries[1].fileName).toEqual('Kod');
      expect(entries[1].lineNumber).toEqual(3);
    });
  });
});
