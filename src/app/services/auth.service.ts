import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/users';

  constructor(private http : HttpClient, private userService:UserService) { }

  signUp(user:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/signup`,user);
  }

  signIn(user:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/signin`,user);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserFromToken():Observable<any> {
    const token : any = this.getToken();
    const tokenDecode:any = jwtDecode(token);
    return this.http.get(`${this.apiUrl}/${tokenDecode.userId}`);
  }

  logout() {
    localStorage.removeItem('token');
  }
}
