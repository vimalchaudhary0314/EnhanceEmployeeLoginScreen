import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],

      // ✅ Add optional fields
      employeeId: [''],
      companyName: ['']
    });
  }

  onSubmit() {
  if (this.loginForm.valid) {

    this.http.post('http://localhost:8080/auth/login', this.loginForm.value, { responseType: 'text' })
      .subscribe({
        next: (res: any) => {
          alert(res); // because backend returns string
        },
        error: (err) => {
          alert(err.error?.message || "Invalid Credentials");
        }
      });
  }
}
}
  
