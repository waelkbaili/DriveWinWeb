import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiServices {

  constructor(public http: HttpClient,private localStore: LocalStorageService) {}

  getHeaders(){
    const headerss = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('responseType', 'text')
    .set('Authorization',  'Bearer ' + this.localStore.getData("token"));
    return headerss;
  }

  login_API(data: any){
    return this.http.post('http://localhost/driveWin/laravel-api/api/v1/login',data);
  }
  register_API(data: any){
    return this.http.post('http://localhost/driveWin/laravel-api/api/v1/register',data);
  }

  logout_API(){
    return this.http.post('http://localhost/driveWin/laravel-api/api/v1/logout',null,{headers:this.getHeaders()});
  }

  getUserData_API(id:string){
    return this.http.get('http://localhost/driveWin/laravel-api/api/v1/users/'+id);
  }
}
