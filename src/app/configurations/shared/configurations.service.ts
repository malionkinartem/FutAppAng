import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IConfiguration } from '../shared/index';
import { settings } from '../../config'
import { JsonHttpService, IResponse, INoDataResponse } from '../../shared/index'


@Injectable()
export class ConfigurationsService {

  private baseApiUrl: string;
  private url: String = '/configurations'

  constructor(private http: Http, private jsonHttp: JsonHttpService) {

  }

  public getConfigurations(): Observable<IConfiguration[]> {
    return this.jsonHttp.get<IConfiguration[]>(settings.apiUrl + this.url)
      .map(response => response.data);
  }

  public save(configuration: IConfiguration) {

    return new Promise((resolve, reject) => {
      this.jsonHttp.post(settings.apiUrl + this.url, configuration)
        .subscribe(response => this.handleResponse(response, resolve, reject))
    });
  }

  public get(id): Observable<IConfiguration> {
    return this.jsonHttp.get(settings.apiUrl + this.url + '/' + id)
      .map(response => response.data);
  }

  public delete(id) {
    return new Promise((resolve, reject) => {
      this.jsonHttp.delete(settings.apiUrl + this.url + '/' + id)
        .subscribe(response => this.handleResponse(response, resolve, reject));
    });
  }

  public update(configuration: IConfiguration) {
    return new Promise((resolve, reject) => {
      this.jsonHttp.put(settings.apiUrl + this.url + '/' + configuration._id, configuration)
        .subscribe((response: IResponse<IConfiguration>) => this.handleResponse(response, resolve, reject));
    })
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.data || {};
  }

  private getOptions() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return new RequestOptions({ headers: headers });
  }

  private handleResponse<T>(response: INoDataResponse, resolve, reject) {
    if (response.isSuccess) {
      resolve();
    } else {
      reject(response.message);
    }
  }
}
