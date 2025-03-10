import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Request} from '../interfaces/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  getAllRequests() {
    return this.http.get("http://localhost:32810/requests");
  }

  getCreated() {
    return this.http.get("http://localhost:32810/requests/created");
  }

  getTaken() {
    return this.http.get("http://localhost:32810/requests/taken");
  }

  getAwaiting() {
    return this.http.get("http://localhost:32810/requests/awaiting");
  }

  createRequest(reqDetails: Request) {
    return this.http.post<any>("http://localhost:32810/requests/create", reqDetails)
  }

  updateRequest(reqDetails: Request) {
    return this.http.post<any>("http://localhost:32810/requests/update", reqDetails)
  }
}
