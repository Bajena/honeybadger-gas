import { Honeybadger } from '../src/honeybadger';
import { UrlFetchAppMock } from './mocks/url-fetch-app';

describe('Honeybadger', () => {
  describe('context', () => {
    it('allows adding context data', () => {
      const urlFetchAppMock = new UrlFetchAppMock();
      const service = new Honeybadger('xxx', {
        UrlFetchApp: urlFetchAppMock
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
      const service = new Honeybadger('xxx', {
        UrlFetchApp: urlFetchAppMock
      });
      service.context({
        abc: 'def'
      });

      service.notify('xxx');

      expect(urlFetchAppMock.lastFetchPayload.request.context).toEqual({
        abc: 'def'
      });
    });
  });
});
