import { Honeybadger } from './honeybadger';

declare var global: any;

// global.test = (): void => {
//   const h = global.init('478e6ff5');
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
//   throw new Error('xxx');
// };

global.notify = (error: any): void => {
  try {
    global._honeybadger.notify(error);
  } catch (hbError) {
    console.log('Failed to notify in Honeybadger', hbError);
  }
};

global.context = (data: any): void => {
  global._honeybadger.context(data);
};

global.init = (apiKey: string): Honeybadger => {
  const honeybadger = new Honeybadger(apiKey, {
    UrlFetchApp
  });

  global._honeybadger = honeybadger;

  return honeybadger;
};
