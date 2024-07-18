import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskStatusService {
  private apiUrl = 'http://localhost:5000/api/task-statuses';

  constructor(private http: HttpClient) {}

  getTaskStatuses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addTaskStatus(taskStatus: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, taskStatus);
  }

  updateTaskStatus(id: string, taskStatus: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, taskStatus);
  }

  deleteTaskStatus(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
