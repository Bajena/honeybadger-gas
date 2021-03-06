import { StacktraceParser, StacktraceEntry } from './stacktrace-parser';
import { ErrorData } from './error-data';
import { VERSION } from './version';

const DEFAULT_ENVIRONMENT = 'production';

export class Honeybadger {
  apiKey: string;
  environment: string;
  private contextData: Object;
  private UrlFetchApp: GoogleAppsScript.URL_Fetch.UrlFetchApp;

  constructor(
    {
      apiKey,
      environment
    }: {
      apiKey: string;
      environment?: string;
    },
    services: any
  ) {
    this.apiKey = apiKey;
    this.environment = environment || DEFAULT_ENVIRONMENT;

    this.UrlFetchApp = services.UrlFetchApp;
    this.contextData = {};
  }

  context(data: Object): void {
    this.contextData = { ...this.contextData, ...data };
  }

  getContext(): Object {
    return this.contextData;
  }

  notify(error: any, additionalOptions: any = {}): void {
    const ed = new ErrorData(error);
    const payload = this.buildPayload(ed, additionalOptions);
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

    this.post(options);
  }

  post(options): void {
    console.log('HB: Sending error notice');
    const resp = this.UrlFetchApp.fetch('https://api.honeybadger.io/v1/notices', options);
    console.log(resp);
  }

  private buildPayload(errorData: ErrorData, additionalOptions: any): Object {
    const backtrace = this.buildBacktrace(errorData);

    return {
      // Please use relevant values for the name, url, and version keys of the
      // `notifier` key that point back to your code/package.
      notifier: {
        name: 'Honeybadger GAS Notifier',
        url: 'https://github.com/Bajena/honeybadger-gas',
        version: VERSION
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
        backtrace: backtrace,
        fingerprint: additionalOptions.fingerprint || errorData.fingerprint
      },

      // `request` contains information about the HTTP request that caused this exception.
      request: {
        // We display this data on the error's details page.
        // `user_id` and `user_email` are special keys that are used to generate the "affected users" list in the UI.
        context: this.contextData,

        // These are displayed under "params" on the error detail page
        params: {}
      },
      server: {
        environment_name: this.environment
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
