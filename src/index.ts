import { Honeybadger } from './honeybadger';

declare var global: any;

// global.test = (): void => {
//   const h = global.init({ apiKey: '478e6ff5' });
//   h.context({
//     user_id: Session.getTemporaryActiveUserKey(),
//     user_locale: Session.getActiveUserLocale(),
//     user_email: Session.getActiveUser().getEmail()
//   });
//   try {
//     global.throwError();
//   } catch (e) {
//     h.notify(e);
//   }
// };

// global.throwError = (): void => {
//   throw new Error('aaaa');
// };

global.notify = (error: any, options: any = {}): void => {
  try {
    global._honeybadger.notify(error, options);
  } catch (hbError) {
    console.log('Failed to notify in Honeybadger', hbError);
  }
};

global.context = (data: any): void => {
  global._honeybadger.context(data);
};

global.getContext = (): any => {
  return global._honeybadger.getContext();
};

global.init = (config: any): Honeybadger => {
  const honeybadger = new Honeybadger(config, {
    UrlFetchApp
  });

  global._honeybadger = honeybadger;

  return honeybadger;
};
