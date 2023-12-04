import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { BadgeComponent } from './badge/badge.component';



@NgModule({
  declarations: [
    ModalComponent,
    BadgeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalComponent,
    BadgeComponent
  ]
})
export class SharedModule { }
