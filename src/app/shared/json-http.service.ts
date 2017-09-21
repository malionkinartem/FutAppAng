import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http'
import { Observable } from 'rxjs'
import { IResponse, INoDataResponse } from './iresponse'

@Injectable()
export class JsonHttpService {

  constructor(private http: Http) { }

  public post<T>(url: string, data: T): Observable<IResponse<T>> {
    return this.http.post(url, data, this.getOptions())
      .map((res: Response) => this.createResponse(res))
      .catch(this.hadleError)
  }

  public put<T>(url: string, data: T): Observable<IResponse<T>> {
    return this.http.put(url, data, this.getOptions())
      .map((res: Response) => this.createResponse(res))
      .catch(this.hadleError)
  }

  public get<T>(url: string): Observable<IResponse<T>> {
    return this.http.get(url)
      .map((res: Response) => this.createResponse(res))
      .catch(this.hadleError)
  }

  public delete(url: string): Observable<INoDataResponse> {
    return this.http.delete(url)
      .map((res: Response) => this.createNoDataResponse(res))
      .catch(this.hadleError)
  }

  private getOptions() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return new RequestOptions({ headers: headers });
  }

  private hadleError(error: Response) {
    console.log(error.statusText);
    return Observable.throw(error.statusText)
  }

  private createResponse<T>(response: Response): IResponse<T> {
    return {
      data: response.json(),
      isSuccess: response.status === 200,
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
