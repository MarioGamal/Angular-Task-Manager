import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/users';
  constructor(private http:HttpClient) { }

  getUser(id:string){
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
