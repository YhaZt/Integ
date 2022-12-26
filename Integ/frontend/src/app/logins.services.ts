import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Login } from './login';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginsService {


  constructor(private http: HttpClient) { }

  // get brands
  getbrands(): Observable<Login[]> {
    return this.http.get<Login[]>(environment.backend_url + '/brands')
      .pipe(
        catchError(this.handleError<Login[]>('fetch all brands',[]))
      )
  }
  // get brand
  getbrand(id: any): Observable<Login> {
    return this.http.get<Login>(environment.backend_url + '/brand/' + id);
  }
  // update brand
  updatebrand(id: any, brand: Login | null): Observable<Login> {
    return this.http.put<Login>(environment.backend_url + '/brand/' + id, brand);
  }
  // delete brand
  deletebrand(id:number):Observable<string>{
    return this.http.delete<string>(environment.backend_url+'/brand/'+id)
  }
  // add brand
  addbrand(brand:object):Observable<Login>{
    return this.http.post<Login>(environment.backend_url+'/brand',brand)
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error('error at operation '+operation)
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
