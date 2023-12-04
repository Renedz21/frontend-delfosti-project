import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';

import { IProject } from 'src/app/models/interfaces/project.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  projects: IProject[] = [];
  name: string = '';

  constructor(
    private projectsService: ProjectsService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAllProjects();
    this.name = this.authService.getSession()?.user?.name || '';
  }

  async findAllProjects() {
    this.projectsService.getProjects().subscribe(
      (projects: IProject[]) => {
        console.log(projects);
        this.projects = projects;
      },
      (error) => {
        console.error(error);
      }
    )
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/auth']);

  }

}
