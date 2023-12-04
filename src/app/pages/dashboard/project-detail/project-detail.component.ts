import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProject } from 'src/app/models/interfaces/project.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectsService } from 'src/app/services/projects.service';

import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  project: IProject = {} as IProject;
  id: string = '';
  modalOpen: boolean[] = [];
  session: any;

  modalCreateOpen: boolean = false;

  formGroup!: FormGroup;

  constructor(
    private projectsService: ProjectsService,
    private taskService: TasksService,
    private activatedRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.id = this.activatedRouter.snapshot.params['id'];
    if (this.id) {
      this.findAllProjects(this.id);
    }

    this.getFormControl();
    this.session = this.authService.getSession()?.user?.roles[0];
  }


  getFormControl(): void {
    this.formGroup = this.formBuilder.group({
      nombre: [''],
      descripcion: [''],
      proyectoId: [this.id]
    })
  }

  async findAllProjects(id: string) {
    this.projectsService.getOneProject(id).subscribe({
      next: (project: IProject) => {
        console.log(project);
        this.project = project;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  openModal(index: number) {
    console.log(this.modalOpen);
    this.modalOpen[index] = true;
  }

  closeModal(index: number) {
    this.modalOpen[index] = false;
    this.modalOpen = [];
  }

  openTaskModal() {
    this.modalCreateOpen = true;
  }

  closeTaskModal() {
    this.modalCreateOpen = false;
  }

  async updateStatus(id: string, status: string) {
    this.taskService.updateTask(id, status).subscribe({
      next: (data: any) => {
        console.log(data);
        this.findAllProjects(this.id);
        this.closeModal(this.id as any);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  async createProject() {
    console.log(this.formGroup.value);
    this.taskService.createTask(this.formGroup.value).subscribe({
      next: (data: any) => {
        console.log(data);
        this.findAllProjects(this.id);
        this.closeTaskModal();
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
