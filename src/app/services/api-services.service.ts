import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServices {

  constructor(public http: HttpClient) {}

  login_API(data: any){
    return this.http.post('http://localhost/driveWin/laravel-api/api/v1/login',data);
  }
  register_API(data: any){
    return this.http.post('http://localhost/driveWin/laravel-api/api/v1/register',data);
  }
}
