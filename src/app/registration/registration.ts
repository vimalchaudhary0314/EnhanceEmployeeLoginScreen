import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './registration.html',
  styleUrls: ['./registration.css']
})
export class RegistrationComponent {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      salary: ['', Validators.required],
      companyName: ['', Validators.required]
    });
  }

  onSubmit() {

    if (this.registerForm.valid) {

      this.http.post('http://localhost:8080/auth/register',
        this.registerForm.value
      ).subscribe({
        next: () => {
          alert('Registration Successful');
          this.router.navigate(['/']);
        },
        error: (err) => {
          alert('Error: ' + err.error?.message);
        }
      });

    }
  }
}
