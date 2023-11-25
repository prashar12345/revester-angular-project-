import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, } from 'rxjs/operators';
import { throwError, Observable, BehaviorSubject, of } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SharedserviceService {
  actionType = new BehaviorSubject("active");
  private _baseUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) {}
  getAllBlogs(param?:any) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    return this.httpClient
      .get(this._baseUrl + "blogs", { params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  get_cate_blog(param?:any) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    // console.log(param);
    return this.httpClient
      .get(this._baseUrl + "blogs", { params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  getAllCategory(param?:any) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key])
      }
    }
    return this.httpClient.get(this._baseUrl + 'categories', { params: params }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }

  getAllCard() {
    return this.httpClient.get(this._baseUrl + 'cards').pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }

  get(id:any) {
    return this.httpClient.get(this._baseUrl + "blog?id=" + id).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  handleError(error: HttpErrorResponse) {
    console.log(error);
    let iserror = false;
    let message = '';
    if (error.error.code == 401) {
      iserror = true;
      message = error.error.message=='authorization'?"Your session has been expired":error.error.message
      // message = error.error.message;
    } else if (error.error.code == 404) {
      iserror = true;
      message = error.error.message;
    } else if (error.error.code == 400) {
      iserror = true;
      message = error.error.message;
    }else if (error.error.code == 500) {
      iserror = true;
      message = error.error.message;
    }
    else if (error.error.code == "E_INVALID_NEW_RECORD") {
      iserror = true;
      message = 'You entered invalid Email';
    }

    return throwError(message?message:'Something bad happened; please try again later.');

  }


  make_card_default(context:any) {
    console.log(context);
    return this.httpClient.put(this._baseUrl + "make/default", context).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
}
