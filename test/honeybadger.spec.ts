import { Honeybadger } from '../src/honeybadger';
import { UrlFetchAppMock } from './mocks/url-fetch-app';

let urlFetchAppMock;
const buildService = (options?: any) => {
  options = options || { apiKey: 'key' };
  urlFetchAppMock = new UrlFetchAppMock();
  return new Honeybadger(options, {
    UrlFetchApp: urlFetchAppMock
  });
};

describe('Honeybadger', () => {
  describe('context', () => {
    it('allows adding context data', () => {
      const service = buildService();

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
      const service = buildService();
      service.context({
        abc: 'def'
      });

      service.notify('xxx');

      expect(urlFetchAppMock.lastFetchPayload.request.context).toEqual({
        abc: 'def'
      });
    });

    describe('sending environment', () => {
      it('sends "production" by default', () => {
        const service = buildService();

        service.notify('xxx');

        expect(urlFetchAppMock.lastFetchPayload.server.environment_name).toEqual('production');
      });

      it('allows overriding default environment', () => {
        const service = buildService({
          apiKey: 'key',
          environment: 'test'
        });

        service.notify('xxx');

        expect(urlFetchAppMock.lastFetchPayload.server.environment_name).toEqual('test');
      });
    });

    it('allows overriding error fingerprint', () => {
      const service = buildService();
      service.context({
        abc: 'def'
      });

      service.notify('xxx');

      expect(urlFetchAppMock.lastFetchPayload.error.fingerprint).toEqual('xxx');

      service.notify('xxx', { fingerprint: 'ffff' });

      expect(urlFetchAppMock.lastFetchPayload.error.fingerprint).toEqual('ffff');
    });
  });
});
