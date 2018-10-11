import { Honeybadger } from './honeybadger';

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

global.Honeybadger = Honeybadger;
