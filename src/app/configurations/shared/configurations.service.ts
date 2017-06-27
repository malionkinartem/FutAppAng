import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ISearchConfig } from '../shared/isearch-config.model';


@Injectable()
export class ConfigurationsService {

  constructor(private http: Http) { }

  public getConfigurations(): Observable<ISearchConfig[]> {
      return this.http.get('http://localhost:3000/api/configurations')
        .map((response: Response) => response.json())
        .catch(this.hadleError)
  }


  private hadleError(error: Response) {
       return Observable.throw(error.statusText)
   }
}
