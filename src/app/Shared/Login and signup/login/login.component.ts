import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    email: '',
    password: '',
    userType: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const payload = {
      email: this.user.email,
      password: this.user.password,
      userType: this.user.userType,
      username: '' // You can optionally leave this empty or use a default
    };

    this.http.post<any>('https://localhost:5001/api/User/login', payload).subscribe({
      next: (response) => {
        console.log('Login Success:', response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/main']); // Navigate to main dashboard
      },
      error: (error) => {
        alert('Login failed: ' + error.error);
      }
    });
  }
}
