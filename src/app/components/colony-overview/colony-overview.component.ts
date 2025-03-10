import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {ContextMenu} from "primeng/contextmenu";
import {Dialog} from "primeng/dialog";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MenuComponent} from "../menu/menu.component";
import {NgIf} from "@angular/common";
import {Ripple} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {Tag} from "primeng/tag";
import {Toast} from "primeng/toast";
import {MenuItem, MenuItemCommandEvent, MessageService} from 'primeng/api';
import {ColonyService} from '../../services/colony.service';
import {Colony} from '../../interfaces/colony';
import {Select} from 'primeng/select';
import {ItemService} from '../../services/item.service';
import {Item} from '../../interfaces/item';

@Component({
  selector: 'app-colony-overview',
  imports: [
    Button,
    ContextMenu,
    Dialog,
    FormsModule,
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
  templateUrl: './colony-overview.component.html',
  styleUrl: './colony-overview.component.css'
})
export class ColonyOverviewComponent implements OnInit {
  items: any;
  expandedRows = {};
  selectedItemVal!: any;
  menuItems! : MenuItem[];
  itemForm: FormGroup;
  updateVisible: boolean = false;
  decoVisible: boolean = false;
  decoForm: FormGroup;
  selectItems! : any;


  constructor(private fb: FormBuilder,
              private messageService: MessageService,
              private colonyService: ColonyService,
              private itemService: ItemService) {
    this.itemForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      population: ['', [Validators.required, Validators.min(0)]]
    });
    this.decoForm = this.fb.group({
      itemName: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(0)]]
    })
  }

  ngOnInit() {
    this.menuItems = [
      {label: 'Change', icon: 'pi pi-pencil', command: () => {this.showUpdate(this.selectedItemVal)}},
      {label: 'add decoration', icon: 'pi pi-plus', command: () => {this.showDeco(this.selectedItemVal)}}
    ]
    this.getColonies();
  }

  showDeco(item: any) {
    this.itemForm.controls["id"].setValue(item.id);
    this.itemService.getItems().subscribe({
      next: value => {
        this.selectItems = value;
      },
      error: err => {
        this.handleError(err);
        return;
      }
    })
    this.decoVisible = true;
  }

  showUpdate(item: any){
    this.updateVisible = true;
    this.itemForm.controls["id"].setValue(item.id);
    this.itemForm.controls["name"].setValue(item.name);
    this.itemForm.controls["population"].setValue(item.population);
  }

  checkRange(toParse: any, val: any) {
    const vals : number[] = toParse.split("-");
    if (val < vals[0] || val > vals[1]) {
      return 'danger';
    }
    return 'success';
  }

  updateColony(){
    const colonyDetails: Colony = { ...this.itemForm.value};
    console.log(colonyDetails);
    this.colonyService.updateColony(colonyDetails).subscribe({
      next: value => {
        this.getColonies();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'updated colony'
        })
      },
      error: err => {
        this.handleError(err);
      }
    })
    this.itemForm.reset();
    this.updateVisible = false;
    this.selectedItemVal = null;
  }

  addDeco() {
    const decoDetails = { ...this.decoForm.value};
    console.log(decoDetails);
    console.log(this.itemForm.controls["id"].getRawValue());
    this.colonyService.addDecorations(decoDetails, this.itemForm.controls["id"].getRawValue()).subscribe({
      next: value => {
        this.getColonies();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'added decoration'
        })
      },
      error: err => {
        this.handleError(err);
      }
    })
    this.decoVisible = false;
    this.decoForm.reset();
    this.selectedItemVal = null;
  }

  getColonies() {
    this.colonyService.getColonies().subscribe({
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

  get itemName() {
    return this.itemForm.controls["name"];
  }

  get population() {
    return this.itemForm.controls["population"];
  }

  get decoName() {
    return this.decoForm.controls["itemName"];
  }

  get amount() {
    return this.decoForm.controls["amount"];
  }
}
