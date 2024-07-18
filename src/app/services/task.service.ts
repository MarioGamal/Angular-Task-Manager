import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/api/tasks';

  constructor(private http: HttpClient) { }

  getTasks(status?:string,date?:string): Observable<any> {
    let params = new HttpParams();
    if(status){
      params = params.set('status',status);
    }

    if(date){
      params = params.set('date',date);
    }
    return this.http.get(this.apiUrl,{params});
  }

  addTask(task: any): Observable<any> {
    return this.http.post(this.apiUrl, task);
  }

  updateTaskStatus(taskId: string, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${taskId}`, { status });
  }

  getTodayTasks():Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/today`);
  }

  getTaskStatistics():Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/stats`);
  }

  getRecentCompletedTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/completed`);
  }

  updateTask(id: string, task: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, task);
  }

  getAllTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

}
