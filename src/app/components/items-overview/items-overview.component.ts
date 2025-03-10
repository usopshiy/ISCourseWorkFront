import {Component, OnInit} from '@angular/core';
import {MenuComponent} from '../menu/menu.component';
import {ItemService} from '../../services/item.service';
import {MenuItem, MessageService} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {Item} from '../../interfaces/item';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Dialog} from 'primeng/dialog';
import {NgIf} from '@angular/common';
import {Tag} from 'primeng/tag';
import {Toast} from 'primeng/toast';
import {ContextMenu} from 'primeng/contextmenu';

@Component({
  selector: 'app-items-overview',
  imports: [
    MenuComponent,
    TableModule,
    Button,
    Dialog,
    ReactiveFormsModule,
    NgIf,
    Tag,
    Toast,
    ContextMenu
  ],
  providers: [
    MessageService
  ],
  templateUrl: './items-overview.component.html',
  styleUrl: './items-overview.component.css'
})
export class ItemsOverviewComponent implements OnInit {
  items : any;
  refreshLoad: boolean = false;
  addLoad: boolean = false;
  addVisible: boolean = false;
  itemForm: FormGroup;
  selectedItem!: Item | null;
  menuItems!: MenuItem[];
  updateVisible: boolean = false;

  constructor(private fb: FormBuilder,
              private itemService: ItemService,
              private messageService: MessageService) {
    this.itemForm = this.fb.group({
      name: ['', [Validators.required]],
      stored: ['', [Validators.required, Validators.min(0)]]
    })
  }

  ngOnInit() {
    this.menuItems = [
      {label: 'Change', icon: 'pi pi-pencil', command: () => this.showUpdate(this.selectedItem)}
    ]
    this.getItems();
  }

  showAdd() {
    this.addVisible = true;
  }

  showUpdate(item: any) {
    this.itemForm.controls["name"].setValue(item.name);
    this.itemForm.controls["stored"].setValue(item.stored);
    this.updateVisible = true;
  }

  getItems() {
    this.refreshLoad = true;
    this.itemService.getItems().subscribe({
      next: value => {
        this.items = value;
      },
      error: err => {
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
    })
    this.refreshLoad = false;
  }

  addItem() {
    const postData: Item = { ...this.itemForm.value};
    console.log(postData);
    this.addLoad = true;
    this.itemService.createNewItem(postData).subscribe({
      next: value => {
        this.getItems();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'successfully added new item'
        })
      },
      error: err => {
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
        }
        else {
          this.messageService.add({
            severity: 'error',
            summary: 'Something went very wrong',
            detail: "Check your internet connection"
          })
        }
      }
    })
    this.addLoad = false;
    this.addVisible = false;
    this.itemForm.reset();
  }

  updateItem() {
    const postData: Item = { ...this.itemForm.value};
    console.log(postData);
    this.itemService.updateItem(postData).subscribe({
      next: value => {
        this.getItems();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'successfully updated new item'
        })
      },
      error: err => {
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
        }
        else {
          this.messageService.add({
            severity: 'error',
            summary: 'Something went very wrong',
            detail: "Check your internet connection"
          })
        }
      }
    })
    this.updateVisible = false;
    this.itemForm.reset();
    this.selectedItem = null;
  }

  getSeverity(amount: number) {
    if (amount == 0) {
      return 'danger';
    }
    if (amount < 5) {
      return 'warn';
    }
    return 'success';
  }

  get itemName() {
    return this.itemForm.controls["name"];
  }

  get stored() {
    return this.itemForm.controls["stored"]
  }
}
