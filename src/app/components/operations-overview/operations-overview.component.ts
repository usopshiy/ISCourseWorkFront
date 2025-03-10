import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {ButtonGroup} from "primeng/buttongroup";
import {ContextMenu} from "primeng/contextmenu";
import {DatePicker} from "primeng/datepicker";
import {Dialog} from "primeng/dialog";
import {MenuComponent} from "../menu/menu.component";
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Ripple} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {Tag} from "primeng/tag";
import {Toast} from "primeng/toast";
import {MenuItem, MessageService} from 'primeng/api';
import {OperationService} from '../../services/operation.service';
import {ColonyService} from '../../services/colony.service';
import {RequestService} from '../../services/request.service';
import {Select} from 'primeng/select';

@Component({
  selector: 'app-operations-overview',
  imports: [
    Button,
    ButtonGroup,
    ContextMenu,
    DatePicker,
    Dialog,
    MenuComponent,
    NgIf,
    ReactiveFormsModule,
    Ripple,
    TableModule,
    Tag,
    Toast,
    Select
  ],
  providers: [
    MessageService
  ],
  templateUrl: './operations-overview.component.html',
  styleUrl: './operations-overview.component.css'
})
export class OperationsOverviewComponent implements OnInit {
  items: any;
  expandedRows = {};
  selectedItemVal!: any;
  itemForm: FormGroup;
  selectTypes: string[] = ["createIncubator", "startColony"];
  selectRequests!: any;
  selectColonies!: any;
  createVisible: boolean = false;


  constructor(private fb: FormBuilder,
              private messageService: MessageService,
              private operationService: OperationService,
              private colonyService: ColonyService,
              private requestService: RequestService) {
    this.itemForm = this.fb.group({
      request_id: [''],
      colony_id: [''],
      type: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.getOperations();
  }

  showCreate() {
    this.colonyService.getColonies().subscribe({
      next: value => {
        this.selectColonies = value;
      },
      error: err => {
        this.handleError(err);
        return;
      }
    });
    this.requestService.getTaken().subscribe({
      next: value => {
        this.selectRequests = value;
      },
      error: err => {
        this.handleError(err);
        return;
      }
    });
    this.createVisible = true;
  }

  getOperations() {
    this.operationService.getAllActiveOperations().subscribe({
      next: value => {
        this.items = value;
      },
      error: err => {
        this.handleError(err);
      }
    })
  }

  failsafeColony(item: any){
    if (item.colony) {
      return item.colony.id;
    }
    return "NuN";
  }

  getSeverity(item: any){
    if (item.request.status == "COMPLETED") {
      return 'success';
    }
    if (item.stage == 0) {
      return 'secondary'
    }
    return 'info'
  }

  addOperation(){
    const postData = {...this.itemForm.value};
    console.log(postData);
    this.operationService.startOpretaion(postData).subscribe({
      next: value => {
        this.getOperations();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'started operation'
        })
      },
      error: err => {
        this.handleError(err);
      }
    })
    this.itemForm.reset();
    this.createVisible = false;
  }

  advance(id: any) {
    this.operationService.progressOperation(id).subscribe({
      next: value => {
        this.getOperations();
        this.messageService.add({
          severity: 'info',
          summary: 'Your prays were answered',
          detail: 'Please check stage description'
        })
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

  get request_id() {
    return this.itemForm.controls["request_id"];
  }

  get colony_id() {
    return this.itemForm.controls["colony_id"];
  }

  get type() {
    return this.itemForm.controls["type"];
  }
}
