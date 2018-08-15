import { StacktraceParser, StacktraceEntry } from './stacktrace-parser';
import { ErrorData } from './error-data';

declare var global: any;

global.notify = (): void => {
  const h = new Honeybadger('180ba7cb');
  try {
    global.throwError();
  } catch (e) {
    h.notify(e);
  }
};

global.throwError = (): void => {
  throw new Error('xxx');
};

class Honeybadger {
  apiKey: string;
  context: Object;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  notify(error: any): void {
    const ed = new ErrorData(error);
    const payload = this.buildPayload(ed);
    const options = {
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      headers: {
        'X-API-Key': this.apiKey
      }
    };
    options['method'] = 'post';

    console.log('Posting with options', options);
    console.log('Payload', payload);
    const resp = UrlFetchApp.fetch('https://api.honeybadger.io/v1/notices', options);
    console.log(resp);
  }

  private buildPayload(errorData: ErrorData): Object {
    const backtrace = this.buildBacktrace(errorData);

    return {
      // Please use relevant values for the name, url, and version keys of the
      // `notifier` key that point back to your code/package.
      notifier: {
        name: 'Honeybadger Notifier',
        url: 'https://github.com/honeybadger-io/honeybadger-ruby',
        version: '1.0.0'
      },
      // Here's where you're exception's class, message tags and backtrace go.
      // The `class` and `message` attributes are what make up the error's "title" that we display in the UI.
      // The `fingerprint` attribute is an optional string that is used to force errors with the same fingerprint (regardless of error class, message, or location) to be grouped together.
      // The `backtrace` is a ruby-style backtrace.  If the `source` attribute is included for a backtrace line, it will be displayed as a snippet in the UI,
      // Last but not least, `causes` is an optional list of causes for the error.
      // Honeybadger displays causes in the order they are listed here.
      error: {
        class: errorData.name,
        message: errorData.message,
        backtrace: backtrace
      },

      // `request` contains information about the HTTP request that caused this exception.
      request: {
        // We display this data on the error's details page.
        // `user_id` and `user_email` are special keys that are used to generate the "affected users" list in the UI.
        context: {
          user_id: 123,
          user_email: 'test@example.com'
        },

        // These are displayed under "params" on the error detail page
        params: {
          // TODO: tutaj parametry wywolania skryptu
        }
      },
      server: {
        // Your environment name
        environment_name: 'development', // TODO: tutaj nazwa deploymentu

        // Optional: Git sha for the deployed version of the code, for linking to GitHub, Gitlab, and BitBucket
        revision: '920201a', // TODO: Tutaj numer wersji

        // Optional: ID of the process that raised the error
        pid: 1138 // TODO: Tutaj wstaw execution id
      }
    };
  }

  private buildBacktrace(errorData: ErrorData): Object[] {
    console.log('Building backtrace for object', errorData);
    return new StacktraceParser(errorData.stack).parse().map(item => {
      return {
        number: item.lineNumber,
        method: item.functionName,
        file: item.fileName
      };
    });
  }
}

global.Honeybadger = Honeybadger;
