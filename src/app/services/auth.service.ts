import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces/user";
import {Token} from '../interfaces/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  registerUser(userDetails: User) {
    return this.http.post<Token>("http://localhost:32810/auth/sign-up", userDetails);
  }

  loginUser(userDetails: User){
    return this.http.post<Token>("http://localhost:32810/auth/sign-in", userDetails);
  }
}
