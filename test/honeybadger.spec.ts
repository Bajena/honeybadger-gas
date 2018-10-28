import { Honeybadger } from '../src/honeybadger';
import { UrlFetchAppMock } from './mocks/url-fetch-app';
import { LockServiceMock } from './mocks/lock-service';

describe('Honeybadger', () => {
  describe('context', () => {
    it('allows adding context data', () => {
      const urlFetchAppMock = new UrlFetchAppMock();
      const lockServiceMock = new LockServiceMock();
      const service = new Honeybadger({ apiKey: 'xxx' }, {
        UrlFetchApp: urlFetchAppMock,
        LockService: lockServiceMock
      });
      expect(service.getContext()).toEqual({});
      service.context({
        abc: 'xxx'
      });
      expect(service.getContext()).toEqual({ abc: 'xxx' });
      service.context({
        abc: 'yyy',
        cde: 'zzz'
      });

      expect(service.getContext()).toEqual({
        abc: 'yyy',
        cde: 'zzz'
      });
    });
  });

  describe('notify', () => {
    it('sends context', () => {
      const urlFetchAppMock = new UrlFetchAppMock();
      const lockServiceMock = new LockServiceMock();
      const service = new Honeybadger({ apiKey: 'xxx' }, {
        UrlFetchApp: urlFetchAppMock,
        LockService: lockServiceMock
      });
      service.context({
        abc: 'def'
      });

      service.notify('xxx');

      expect(urlFetchAppMock.lastFetchPayload.request.context).toEqual({
        abc: 'def'
      });
    });

    it('allows overriding error fingerprint', () => {
      const urlFetchAppMock = new UrlFetchAppMock();
      const lockServiceMock = new LockServiceMock();
      const service = new Honeybadger({ apiKey: 'xxx' }, {
        UrlFetchApp: urlFetchAppMock,
        LockService: lockServiceMock
      });
      service.context({
        abc: 'def'
      });

      service.notify('xxx');

      expect(urlFetchAppMock.lastFetchPayload.error.fingerprint).toEqual('xxx');

      service.notify('xxx', { fingerprint: 'ffff' });

      expect(urlFetchAppMock.lastFetchPayload.error.fingerprint).toEqual('ffff');
    });
  });

  describe('locking while sending errors', () => {
    it('locks script by default to prevent race conditions', () => {
      const urlFetchAppMock = new UrlFetchAppMock();
      const lockServiceMock = new LockServiceMock();
      const service = new Honeybadger({ apiKey: 'xxx' }, {
        UrlFetchApp: urlFetchAppMock,
        LockService: lockServiceMock
      });
      service.notify('aaa');

      const lock = lockServiceMock.getScriptLock();
      expect(lock.tryLockCalls).toEqual(1);
      expect(lock.locked).toEqual(false);
    });

    it('allows preventing locks', () => {
      const urlFetchAppMock = new UrlFetchAppMock();
      const lockServiceMock = new LockServiceMock();
      const service = new Honeybadger({
        apiKey: 'xxx',
        lockToNotify: false
      }, {
        UrlFetchApp: urlFetchAppMock,
        LockService: lockServiceMock
      });

      service.notify('aaa');

      const lock = lockServiceMock.getScriptLock();
      expect(lock.tryLockCalls).toEqual(0);
      expect(lock.locked).toEqual(false);
    });
  });
});
