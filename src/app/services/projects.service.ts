import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Project } from '../models/classes/project.class';
import { IProject } from '../models/interfaces/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/projects`);
  }

  getOneProject(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/projects/${id}`);
  }
}
