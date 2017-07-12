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
    let options = this.getOptions();

    return new Promise((resolve, reject) => {
      this.http.post(settings.apiUrl + this.url, configuration, options)
        .subscribe(x => {
          if (x.status === 200) {
            resolve();
          }
          else {
            reject(x.statusText);
          }
        })
    });
  }

  public get(id): Observable<IConfiguration> {
    return this.http.get(settings.apiUrl + this.url + '/' + id)
      .map(res => res.json())
      .catch(this.hadleError);
  }

  public delete(id) {
    let options = this.getOptions();

    return new Promise((resolve, reject) => {
      this.http.delete(settings.apiUrl + this.url + '/' + id, options)
        .subscribe(x => {
          if (x.status === 200) {
            resolve();
          }
          else {
            reject(x.statusText);
          }
        });
    });
  }

  public update(configuration: IConfiguration) {
    return new Promise((resolve, reject) => {
      this.http.put(settings.apiUrl + this.url + '/' + configuration._id, configuration, this.getOptions())
        .subscribe(x => {
          if (x.status === 200) {
            resolve();
          }
          else {
            reject(x.statusText);
          }
        })
    })
  }

  private hadleError(error: Response) {
    console.log(error.statusText);
    return Observable.throw(error.statusText)
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private getOptions() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return new RequestOptions({ headers: headers });
  }
}
