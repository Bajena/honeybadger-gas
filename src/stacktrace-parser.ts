export class StacktraceEntry {
  lineNumber: number;
  fileName: string;
  functionName: string;
}

export class StacktraceParser {
  private stack: string;

  constructor(stack: string) {
    this.stack = stack;
  }

  private parseLine(line: string): StacktraceEntry | null {
    console.log('Parsing stacktrace line:', line);
    // Correct lines:
    // at Kod:123 (bla)
    // at Kod:123
    const lineMatch = line.match(/at (?:(.+)):(?:(\d+))(?:\s+\((.+)\))?/);

    if (!lineMatch) {
      return null;
    }

    const entry = new StacktraceEntry();
    entry.fileName = lineMatch[1] || '';
    entry.lineNumber = parseInt(lineMatch[2]);
    entry.functionName = lineMatch[3] || '<anonymous>';
    return entry;
  }

  parse(): StacktraceEntry[] {
    console.log('Parsing stacktrace:', this.stack);
    const lines = this.stack.split('\n');
    return lines.map(line => this.parseLine(line)).filter(line => line);
  }
}
