import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthRepository } from 'data';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly _fb = inject(FormBuilder);
  private readonly _auth = inject(AuthRepository);

  loginForm = this._fb.group({
    username: this._fb.control<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: this._fb.control<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor() {}

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

      const { username, password } = this.loginForm.getRawValue();

      const r = await this._auth.login({
        password,
        username,
      });

      console.log('login:', r);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
