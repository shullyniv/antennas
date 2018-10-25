import { Injectable } from '@angular/core';
import { User } from "./user";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: User;
  public nameUser: any;
  showSpinner = false;
  constructor(private http: HttpClient) {
  }
  showsSpinner() {
    this.showSpinner = true;
  }
  hideSpinner() {
    this.showSpinner = false;
  }
  add(user: User) {
    this.showsSpinner();
    return this.http.post("http://localhost:54599/api/register", user)
      .subscribe(res => {
        this.hideSpinner();
        localStorage.setItem('userToken', JSON.stringify(user));
        this.user = user;
      }
      , err => {
        this.hideSpinner();
        console.log(err)
      }
      );

  }

  loginUser(user: any) {
    this.showsSpinner();
    return this.http.post("http://localhost:54599/api/login", user).toPromise()
      .then(res => {
        this.hideSpinner();
        localStorage.setItem('userToken', JSON.stringify(user));
        this.user = user;
      });
  }

  //   checkconnectToServerAdmin(): Observable<any> {
  //     return this.http.get("http://localhost:9895/api/login")
  //         .map((response: any) => response)
  //         .catch((response: HttpErrorResponse) => Observable.throw(response));
  // }
}
