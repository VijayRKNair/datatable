import { Injectable } from '@angular/core';
import { configuration } from '../../common/properties/config';
import { HttpService } from '../../common/services/http.service';
import { HttpModel } from '../../common/models/http-detail';
@Injectable({
  providedIn: 'root'
})
export class UserListingService {

  constructor(private httpService: HttpService) { }
  getUersList() {
    const httpObj = new HttpModel(
      configuration.urlMappings.getUsersList,
      configuration.callType.GET
    );
    return this.httpService.invokeHttp(httpObj);
  }
}
