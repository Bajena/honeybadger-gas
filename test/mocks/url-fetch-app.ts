import UrlFetch = GoogleAppsScript.URL_Fetch;
import Base = GoogleAppsScript.Base;

class HTTPResponseMock implements UrlFetch.HTTPResponse {
  getAllHeaders(): Object {
    return {};
  }
  getAs(contentType: string): Base.Blob {
    return null;
  }
  getBlob(): Base.Blob {
    return null;
  }
  getContent(): any[] {
    return [];
  }
  getContentText(charset?: string): string {
    return '';
  }
  getHeaders(): Object {
    return {};
  }
  getResponseCode(): any {
    return 0;
  }
}

export class UrlFetchAppMock implements UrlFetch.UrlFetchApp {
  lastFetchParams: UrlFetch.URLFetchRequestOptions;
  lastFetchPayload: any;

  fetch(url: string, params?: UrlFetch.URLFetchRequestOptions): UrlFetch.HTTPResponse {
    console.log('FETCH', url, params);
    this.lastFetchParams = params;
    if (params.payload) {
      this.lastFetchPayload = JSON.parse(params.payload.toString());
    }
    return new HTTPResponseMock();
  }

  fetchAll(requests: Object[]): UrlFetch.HTTPResponse[] {
    return [];
  }
  getRequest(url: string, params?: UrlFetch.URLFetchRequestOptions): Object {
    return {};
  }
}
