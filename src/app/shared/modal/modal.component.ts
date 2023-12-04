import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Output() closeModalEvent: EventEmitter<void> = new EventEmitter<void>();
  @Input() index: number = 0;

  closeModal() {
    this.closeModalEvent.emit();
  }
}
