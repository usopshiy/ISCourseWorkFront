import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Colony} from '../interfaces/colony';
import {Decoration} from '../interfaces/decoration';

@Injectable({
  providedIn: 'root'
})
export class ColonyService {

  constructor(private http: HttpClient) { }

  getColonies() {
    return this.http.get<any>("http://localhost:32810/colonies");
  }

  updateColony(colonyDetails: Colony) {
    return this.http.post<any>("http://localhost:32810/colonies/update", colonyDetails);
  }

  addDecorations(decoDetails: Decoration, id: number) {
    return this.http.post<any>("http://localhost:32810/colonies/" + id.toString() + "/add-decoration", decoDetails);
  }
}
