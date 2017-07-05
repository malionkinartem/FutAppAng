import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ISearchConfig } from '../shared/isearch-config.model';
import { settings } from '../../config'


@Injectable()
export class ConfigurationsService {

  private baseApiUrl: string;

  constructor(private http: Http) { 
    
  }

  public getConfigurations(): Observable<ISearchConfig[]> {
      return this.http.get(settings.apiUrl + '/api/configurations')
        .map((response: Response) => response.json())
        .catch(this.hadleError)
  }


  private hadleError(error: Response) {
       return Observable.throw(error.statusText)
   }
}
