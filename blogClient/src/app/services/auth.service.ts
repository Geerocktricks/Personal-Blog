import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInterface } from '../interfaces/user';
import { Observable } from 'rxjs/internal/Observable';

let httpOtions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
})
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = 'http://localhost:3000';
  authToken: any;
  user!: any;

  constructor( private http: HttpClient) { }

  registerUser(user: any):Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/authenticate/register`, user, httpOtions)
  }
}
