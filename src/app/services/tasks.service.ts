import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';
import { Task } from '../models/classes/task.class';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) { }

  createTask(task: Task): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/task`, task, {
      headers: {
        'Authorization': `Bearer ${this.authService.getSession()?.token}`
      }
    });
  }


  updateTask(taskId: string, status: string): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/task/${taskId}/status`, {
      status: status
    }, {
      headers: {
        'Authorization': `Bearer ${this.authService.getSession()?.token}`
      }
    });
  }
}
