
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PageServiceService {
  _baseUrl = environment.apiUrl;
 
  constructor(private httpClient: HttpClient) { }

  get(text:any) {
    return this.httpClient.get(this._baseUrl + 'content?slug=' + text).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }
  getAllPlans(param:any) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    return this.httpClient
      .get(this._baseUrl + "plans", { params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  savecard(context:any) {
    return this.httpClient.post(this._baseUrl + 'save/card', context).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  getcarddetails(context:any) {
    return this.httpClient.post(this._baseUrl + 'card?cardId=', context).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
 
  getPropertyDetail(param?:any) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    return this.httpClient
      .get(this._baseUrl + "property/details", { params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  getPropertyListAll(param?:any) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    return this.httpClient
      .get(this._baseUrl + "property", { params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  getPropertyList(param?:any) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    return this.httpClient
      .get(this._baseUrl + "property/search/address", { params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  Paynow(context:any) {
    return this.httpClient.post(this._baseUrl + 'paynow', context).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  getDetailPlanType() {
    return this.httpClient.get(this._baseUrl + 'plan/features').pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  } 
  getPropertyDetails(param?: any) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key])
      }
    }
    return this.httpClient.get(this._baseUrl + 'property/details', { params: params }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }
  Transaction(userId: any,param?: any) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    return this.httpClient.get(this._baseUrl + 'transactions?userId='+userId ,{ params: params }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  } 
  handleError(error: HttpErrorResponse) {
    if (error.error.code == 401) {
      return throwError('Session Expired. Please login.');
    } else if (error.error.code == 404) {  
      return throwError(error.error.message);
    }
    else if (error.error.code == 400) {
      return throwError(error.error.message);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

}
