import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './components/login/login.component';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TitleCasePipe, LoginComponent, HttpClientModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ISFront';
}
