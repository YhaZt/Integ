import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const loginData = {
      email: this.email,
      password: this.password
    };



    this.http.post('http://127.0.0.1:8000/api/login', loginData, { headers })
    .subscribe((data: any) => {
      localStorage.setItem('token', data.access_token);
      console.log('Login successful');
    },
    error => {
      console.error('Login failed');
    });

  }
}
