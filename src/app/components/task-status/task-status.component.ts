import { Component } from '@angular/core';
import { TaskStatusService } from '../../services/task-status.service';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';

@Component({
  selector: 'app-task-status',
  standalone: true,
  imports: [TopBarComponent,NavbarComponent,FormsModule,ReactiveFormsModule],
  templateUrl: './task-status.component.html',
  styleUrl: './task-status.component.css'
})
export class TaskStatusComponent {
  taskStatusForm : FormGroup;
  taskStatuses:any[] = [];
  modalRef: NgbModalRef | null = null;

  constructor(
    private taskStatusService: TaskStatusService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.taskStatusForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit():void {
    this.loadTaskStatuses();
  }

  loadTaskStatuses(): void {
    this.taskStatusService.getTaskStatuses().subscribe(taskStatuses => {
      this.taskStatuses = taskStatuses;
    });
  }

  openEditModal(content: any, taskStatus: any): void {
    this.taskStatusForm.setValue({ name: taskStatus.name });
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then(result => {
      if (result === 'Save') {
        this.updateTaskStatus(taskStatus._id, this.taskStatusForm.value.name, taskStatus.enabled);
      }
    }, reason => {
      // Handle dismiss action if needed
    });
  }

  addTaskStatus(): void {
    const newTaskStatus = { name: 'New Status', enabled:true };
    this.taskStatusService.addTaskStatus(newTaskStatus).subscribe(status => {
      this.taskStatuses.push(status);
    });
  }

  updateTaskStatus(id: string, name: string, enabled: boolean): void {
    const updatedStatus = { name, enabled };
    this.taskStatusService.updateTaskStatus(id, updatedStatus).subscribe(status => {
      const index = this.taskStatuses.findIndex(ts => ts._id === id);
      this.taskStatuses[index] = status;
    });
  }

  save(): void {
    if (this.taskStatusForm.valid) {
      this.modalRef?.close('Save');
    }
  }

}
