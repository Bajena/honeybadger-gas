import { Honeybadger } from './honeybadger';

declare var global: any;

// global.notify = (): void => {
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

// global.Honeybadger = Honeybadger;

global.init = (apiKey: string): Honeybadger => {
  return new Honeybadger(apiKey, {
    UrlFetchApp
  });
};
