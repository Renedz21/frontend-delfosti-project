import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment.development';
import { IRegister } from '../models/interfaces/request/register.interface';
import { Session } from '../models/classes/session.class';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  login(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, data);
  }

  register(user: IRegister): Observable<IRegister> {
    return this.http.post<IRegister>(`${environment.apiUrl}/auth/register`, user);
  }

  logout(): void {
    sessionStorage.removeItem('session');
  }

  saveSession(session: Session): void {
    session.authenticated = true;
    sessionStorage.setItem('session', JSON.stringify(session));
  }

  getSession(): Session | undefined {
    if (!sessionStorage.getItem('session')) {
      return undefined;
    }

    return JSON.parse(sessionStorage.getItem('session')!!) as Session
  }

  // tokenRefresh(request:any): Observable<any> {
  //   return this.http.post(`${environment.apiUrl}/auth/refresh`, request);
  // }



}
