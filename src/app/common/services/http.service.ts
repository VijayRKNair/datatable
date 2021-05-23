import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';


import { HttpModel } from '../models/http-detail';

import { configuration } from '../properties/config';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private httpClient: HttpClient
  ) { }

  invokeHttp(httpObj: HttpModel): Observable<HttpResponse<Object>> {

    const serviceURL = (environment.serviceURL) + httpObj.partialURL;

    if (httpObj.callType == configuration.callType.GET) {
      return this.httpClient.get(serviceURL, {
        headers: {},
        observe: 'response'
      });
    } else {
      return this.httpClient.post(serviceURL, httpObj.dataJSON, {
        headers: {},
        observe: 'response',
        responseType: httpObj.responseType
      });
    }
  }
}
