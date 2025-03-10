import {Component, OnInit} from '@angular/core';
import {ContextMenu} from "primeng/contextmenu";
import {MenuComponent} from "../menu/menu.component";
import {Toast} from "primeng/toast";
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {TableModule} from 'primeng/table';
import {Tag} from 'primeng/tag';
import {ButtonGroup} from 'primeng/buttongroup';
import {MenuItem, MessageService} from 'primeng/api';
import {RequestService} from '../../services/request.service';
import {Ripple} from 'primeng/ripple';
import {Item} from '../../interfaces/item';
import {DatePicker} from 'primeng/datepicker';
import {Request} from '../../interfaces/request';

@Component({
  selector: 'app-requests-overview',
  imports: [
    ContextMenu,
    MenuComponent,
    Toast,
    Button,
    Dialog,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    TableModule,
    Tag,
    ButtonGroup,
    Ripple,
    DatePicker,
  ],
  providers: [
    MessageService
  ],
  templateUrl: './requests-overview.component.html',
  styleUrl: './requests-overview.component.css'
})
export class RequestsOverviewComponent implements OnInit {
    selected: number = 0;
    items: any;
    expandedRows = {};
    selectedItem!: Item | null;
    menuItems!: MenuItem[];
    itemForm: FormGroup;
    createVisible: boolean = false;

    constructor (private messageService: MessageService,
                 private requestService: RequestService,
                 private fb: FormBuilder) {
      this.itemForm = this.fb.group({
        id : [''],
        type : ['', [Validators.required]],
        completionTime : ['', [Validators.required]],
        status : [''],
        details : ['', [Validators.required]]
      })
    }

  ngOnInit() {
      this.menuItems = [
        {label: 'Take', icon: 'pi pi-check', command: () => this.takeRequest(this.selectedItem)},
        {label: 'Complete', icon: 'pi pi-check-circle', command: () => this.completeRequest(this.selectedItem)}
      ]
    this.getRequests();
  }

  takeRequest(item: any) {
    this.itemForm.controls["id"].setValue(item.id);
    this.itemForm.controls["type"].setValue(item.type);
    this.itemForm.controls["completionTime"].setValue(item.completionTime);
    this.itemForm.controls["status"].setValue("ASSIGNED");
    this.itemForm.controls["details"].setValue(item.details);
    this.updateRequest();
    this.selectedItem = null;
  }

  completeRequest(item: any){
    this.itemForm.controls["id"].setValue(item.id);
    this.itemForm.controls["type"].setValue(item.type);
    this.itemForm.controls["completionTime"].setValue(item.completionTime);
    this.itemForm.controls["status"].setValue("COMPLETED");
    this.itemForm.controls["details"].setValue(item.details);
    this.updateRequest();
    this.selectedItem = null;
  }

  updateRequest() {
    const postData: Request = { ...this.itemForm.value};
    console.log(postData);
      this.requestService.updateRequest(postData).subscribe({
        next: value => {
          this.getRequests();
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail: 'added new request'
          })
        },
        error: err => {
          this.handleError(err);
        }
      })
    this.itemForm.reset();
  }

  showCreate() {
      this.createVisible = true;
  }

  getRequests() {
      switch (this.selected) {
        case 1:
          this.getCreated();
          break;
        case 2:
          this.getTaken();
          break;
        case 3:
          this.getAwaiting();
          break;
        default:
          this.getAll();
      }
  }

  buttonPress(num: number) {
      this.selected = num;
      this.getRequests();
  }

  getTaken() {
      this.requestService.getTaken().subscribe({
        next: value => {
          this.items = value;
        },
        error: err => {
          this.handleError(err);
        }
      })
  }

  getCreated() {
    this.requestService.getCreated().subscribe({
      next: value => {
        this.items = value;
      },
      error: err => {
        this.handleError(err);
      }
    })
  }

  getAwaiting() {
    this.requestService.getAwaiting().subscribe({
      next: value => {
        this.items = value;
      },
      error: err => {
        this.handleError(err);
      }
    })
  }

  getAll() {
    this.requestService.getAllRequests().subscribe({
      next: value => {
        this.items = value;
      },
      error: err => {
        this.handleError(err);
      }
    })
  }

  handleError(err: any) {
      if (err.status == 400) {
        this.messageService.add({
          severity: 'error',
          summary: 'Something went wrong',
          detail: err.error.message
        })
      }
      else if (err.status == 403) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Access denied',
          detail: 'You are not allowed to do that'
        })
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Something went very wrong',
          detail: "Check your internet connection"
        })
      }
    }

  getSeverity(status: any) {
    switch (status) {
      case "ON_ASSIGNMENT":
        return 'info';
      case "ASSIGNED":
        return 'secondary';
      case "COMPLETED":
        return 'success';
      default:
        return 'warn';
    }
  }

  addRequest() {
      this.itemForm.controls["status"].setValue("ON_ASSIGNMENT");
      const postData: Request = { ...this.itemForm.value};
      console.log(postData);
      this.requestService.createRequest(postData).subscribe({
        next: value => {
          this.getRequests();
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail: 'added new request'
          })
        },
        error: err => {
          this.handleError(err);
        }
      })
      this.createVisible = false;
      this.itemForm.reset();
  }

  failsafeUsername(item: any) {
    if (item.assignee) {
      return item.assignee.username;
    }
    return "none";
  }

  get type() {
      return this.itemForm.controls["type"];
  }

  get completionTime() {
    return this.itemForm.controls["completionTime"];
  }

  get status() {
    return this.itemForm.controls["status"];
  }

  get details() {
    return this.itemForm.controls["details"];
  }
}
