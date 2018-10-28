interface IError {
  message: string;
  stack: string;
  name: string;
}

function isError(error: string | IError): error is IError {
  return (<IError>error).name !== undefined;
}

export class ErrorData {
  message: string;
  stack: string;
  name: string;
  fingerprint: string;

  constructor(error: any) {
    if (isError(error)) {
      this.message = error.message;
      this.stack = error.stack;
      this.name = error.name;
    } else if (typeof error === 'string') {
      this.message = error;
      this.name = 'Error';
      this.stack = '';
    } else {
      throw `Unknown error type: ${error}`;
    }

    this.fingerprint = this.stack || this.message;
  }
}
