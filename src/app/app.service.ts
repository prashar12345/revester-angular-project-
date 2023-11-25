import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, } from 'rxjs/operators';
import { throwError, Observable, BehaviorSubject, of } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private _baseUrl = environment.apiUrl;
  rootUrl: any;
  http: any;
  resent_email: any;
  josn_email: any;
  user_info: any;

  constructor(
    private httpClient: HttpClient) {
    this.user_SubscriptionPlan()
  }
  public searchData = new BehaviorSubject<any>(undefined);
  currentsearchData = this.searchData.asObservable();
  changeSearchData(search: any) {
    this.searchData.next(search);
  }
  post(url: any, context: any) {
    return this.httpClient.post(this._baseUrl + url, context).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  put(url: any, context?: any) {
    return this.httpClient.put(this._baseUrl + url, context).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  getAllDetails(url: any, param?: any, baseUrl: any = '') {
    let params = new HttpParams();
    let _baseUrl = baseUrl ? baseUrl : this._baseUrl;
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key])
      }
    }
    return this.httpClient.get(_baseUrl + url, { params: params }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }

  uploadImage(fileToUpload: File, type: any) {
    let params: any = '?modelName=' + type
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('modelName', type);
    return this.httpClient.post(this._baseUrl + `upload/image` + params, formData).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }


  signup(context: any) {
    return this.httpClient.post(this._baseUrl + 'signup', context).pipe(
      map((response: any) => {
        this.resent_email = context.email;
        return response;
      }),
      catchError(this.handleError)
    );
  }
  get(id: any) {
    return this.httpClient.get(this._baseUrl + 'user/plan?id=' + id).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }

  autoLogin(context: any) {
    const object: any = { id: context };
    return this.httpClient.post(this._baseUrl + 'autoLogin', object).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }

  uploadMethod(fileToUpload: File, url: any, param: any = {}) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key])
      }
    }

    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient.post(this._baseUrl + url + '?' + params, formData).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getNotification(url: any) {
    return this.httpClient.get(this._baseUrl + 'notifications').pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }
  deleteNoti(param?: any) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key])
      }
    }
    return this.httpClient.delete(this._baseUrl + 'notification', { params: params }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }
  // getMessages(url:any, param?:any) {
  //   // let params = this.getParams(param)
  //   return this.httpClient.get(this._baseUrl + 'notifications', { params: {} }).pipe(
  //     map((response: any) => {
  //       return response;
  //     }),
  //     catchError(this.handleError)
  //   ) http://74.208.206.18:4813/property?pageSize=10&page=1
  // }

  getPropertyDetails(id:any) {
    
    return this.httpClient.get(this._baseUrl + 'search/data?id='+id).pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  getPropertyD(param?:any) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key]);
      }
    }
    return this.httpClient.get(this._baseUrl + 'property/details', { params: params  }).pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  getSellingArea(add:any,add1:any) {
    
    return this.httpClient.get(this._baseUrl + 'sales/data?address1='+add+'&address2='+add1).pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  getPotentialARV(add:any,add1:any) {
    
    return this.httpClient.get(this._baseUrl + 'avm/data?address1='+add+'&address2='+add1).pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
  
  getAuthorizationHeader() {
    throw new Error("Method not implemented.");
  }
  allApi(url: any = '', context: any = {}, method: any = 'get') {
    if (method == 'post') {
      return this.add(context, url)
    } else if (method == 'put') {
      return this.update(context, url)
    } else if (method == 'delete') {
      return this.deleteRecord(context, url)
    }
    return this.getAll(url, context);
  }

  ForgotPassword(context: any, url: any) {
    return this.httpClient.post(this._baseUrl + 'forgotpassword', context).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  add(context: any, url: any) {
    return this.httpClient.post(this._baseUrl + 'signin', context).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  subscribe(context: any) {
    return this.httpClient.post(this._baseUrl + 'add/subscribe', context).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  update(context: any, url: any) {
    return this.httpClient.put(this._baseUrl + url, context).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getAll(url: any, param?: any, baseUrl: any = '') {
    let params = new HttpParams();
    let _baseUrl = baseUrl ? baseUrl : this._baseUrl;
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key])
      }
    }
    return this.httpClient.get(_baseUrl + url, { params: params }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }

  getAllAmenities(url: any) {
    return this.httpClient.get(this._baseUrl + url).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }

  status(id: any, model: any, status: any) {
    let url = this._baseUrl + 'changeStatus?id=' + id + '&model=' + model + '&status=' + status;

    return this.httpClient.put(url, {}).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }


  deleteRecord(param?: any, url: any = 'delete') {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key])
      }
    }
    return this.httpClient.delete(this._baseUrl + url, { params: params }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }

  moveBackRecord(param?: any) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key])
      }
    }
    return this.httpClient.delete(this._baseUrl + 'delete/undo', { params: params }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }

  getTotalCount(url: any) {
    return this.httpClient.get(this._baseUrl + url).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }
  getAllPlanState(url: any) {
    return this.httpClient.get(this._baseUrl + url).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }


  markRead(url: any) {
    return this.httpClient.put(this._baseUrl + url, '').pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getParams(parameters: any) {
    let params = new HttpParams();
    Object.keys(parameters).map((key) => {
      params = params.set(key, parameters[key]);
    })
    return params;
  }


  handleError(error: HttpErrorResponse) {
    console.log(error);
    let iserror = false;
    let message = '';
    if (error.error.code == 401) {
      iserror = true;
      message = error.error.message == 'authorization' ? "Your session has been expired" : error.error.message
      // message = error.error.message;
    } else if (error.error.code == 404) {
      iserror = true;
      message = error.error.message;
    } else if (error.error.code == 400) {
      iserror = true;
      message = error.error.message;
    } else if (error.error.code == 500) {
      iserror = true;
      message = error.error.message;
    }
    else if (error.error.code == "E_INVALID_NEW_RECORD") {
      iserror = true;
      message = 'You entered invalid Email';
    }

    return throwError(message ? message : 'Something bad happened; please try again later.');






  }
  resendverification() {
    this.josn_email = { "email": this.resent_email };
    return this.httpClient.post(this._baseUrl + 'resendverification', this.josn_email).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  user_SubscriptionPlan(): any {

    this.user_info = localStorage.getItem('credentials')
    this.user_info = JSON.parse(this.user_info)
    if (this.user_info) {
      if (this.user_info.subscriptionPlan) {
        return true;
      } else {
        return false;
      }
    }
  }
}
