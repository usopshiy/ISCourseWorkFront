import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Operation} from '../interfaces/operation';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private http: HttpClient) { }

  getAllActiveOperations() {
    return this.http.get<any>("http://localhost:32810/operations");
  }

  progressOperation(id: any) {
    return this.http.get<any>("http://localhost:32810/operations/progress/" + id);
  }

 startOpretaion(operationDetails: Operation) {
    return this.http.post<any>("http://localhost:32810/operations/start", operationDetails)
 }
}
