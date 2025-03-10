import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Item} from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get<any>("http://localhost:32810/items");
  }

  createNewItem(itemDetails: Item) {
    return this.http.post<any>("http://localhost:32810/items/create", itemDetails);
  }

  updateItem(itemDetails: Item) {
    return this.http.post<any>("http://localhost:32810/items/update", itemDetails)
  }
}
