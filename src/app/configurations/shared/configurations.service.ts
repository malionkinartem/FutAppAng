import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IConfiguration } from '../shared/index';
import { settings } from '../../config'


@Injectable()
export class ConfigurationsService {

  private baseApiUrl: string;
  private url: String = "/configurations"

  constructor(private http: Http) {

  }

  public getConfigurations(): Observable<IConfiguration[]> {
    return this.http.get(settings.apiUrl + this.url)
      .map((response: Response) => response.json())
      .catch(this.hadleError)
  }

  public save(configuration: IConfiguration) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(settings.apiUrl + this.url, configuration, options)
        .subscribe(x=> { 
          if(x.status === 200){
            resolve();
          }
          else{
            reject(x.statusText);
          }
        })
    });
  }

  private hadleError(error: Response) {
    console.log(error.statusText);
    return Observable.throw(error.statusText)
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }
}
