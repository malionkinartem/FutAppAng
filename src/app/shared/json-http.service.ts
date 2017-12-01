import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { IResponse, INoDataResponse } from './iresponse'
import { SessionService } from './session.service'

@Injectable()
export class JsonHttpService {

  constructor(private http: Http, private session: SessionService) { }

  public post<T>(url: string, data: object): Observable<IResponse<T>> {
    return this.http.post(url, data, this.postOptions())
      .map((res: Response) => this.createResponse(res))
      .catch(this.hadleError)
  }

  public put<T>(url: string, data: object): Observable<INoDataResponse> {
    return this.http.put(url, data, this.getOptions())
      .map((res: Response) => this.createNoDataResponse(res))
      .catch(this.hadleError)
  }

  public get<T>(url: string): Observable<IResponse<T>> {
    return this.http.get(url, this.getOptions())
      .map((res: Response) => this.createResponse(res))
      .catch(this.hadleError)
  }

  public delete(url: string): Observable<INoDataResponse> {
    return this.http.delete(url, this.getOptions())
      .map((res: Response) => this.createNoDataResponse(res))
      .catch(this.hadleError)
  }

  private getOptions() {
    let header = {  };
    if (this.session.AuthToken) {
      header = Object.assign(header, { 'Authorization': 'Bearer ' + this.session.AuthToken });
    }
    const headers = new Headers(header);
    return new RequestOptions({ headers: headers });
  }

  private postOptions() {
    let header = { 'Content-Type': 'application/json' };
    if (this.session.AuthToken) {
      header = Object.assign(header, { 'Authorization': 'Bearer ' + this.session.AuthToken });
    }
    const headers = new Headers(header);
    return new RequestOptions({ headers: headers });
  }
 
  private hadleError(error: Response) {
    console.log(error.statusText);
    return Observable.throw(error.statusText)
  }

  private createResponse<T>(response: Response): IResponse<T> {
    var json = response.json();
    return {
      data: json.data,
      isSuccess: response.status === 200 && (json.isSuccess == undefined || json.isSuccess),
      message: response.statusText
    };
  }

  private createNoDataResponse(response: Response): INoDataResponse {
    return {
      isSuccess: response.status === 200,
      message: response.statusText
    };
  }
}
