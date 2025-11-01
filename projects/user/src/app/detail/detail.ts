import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';

import { USERS_REPOSITORY } from 'data';

import type { User } from 'data';

@Component({
  selector: 'app-detail',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule],
  template: `
    <div class="page">
      <mat-card class="card">
        <mat-card-header>
          <mat-card-title>User Detail</mat-card-title>
          <mat-card-subtitle>
            @if (user(); as u) {
              ID: {{ u.id }}
            } @else {
              User information
            }
          </mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          @if (loading()) {
            <div class="loading">
              <mat-spinner diameter="32"></mat-spinner>
            </div>
          } @else if (error()) {
            <p class="error">{{ error() }}</p>
          } @else if (user(); as u) {
            <dl class="details">
              <div>
                <dt>Username</dt>
                <dd>{{ u.username }}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{{ u.email }}</dd>
              </div>
              <div>
                <dt>Name</dt>
                <dd>{{ u.name.firstname }} {{ u.name.lastname }}</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>{{ u.phone }}</dd>
              </div>
              <div>
                <dt>Address</dt>
                <dd>
                  {{ u.address.street }} {{ u.address.number }}, {{ u.address.city }}
                  {{ u.address.zipcode }}
                </dd>
              </div>
            </dl>
          } @else {
            <p class="empty">No user selected.</p>
          }
        </mat-card-content>

        <mat-card-actions align="end">
          <button mat-stroked-button color="primary" (click)="goBack()">Back</button>
          <button mat-flat-button color="primary" (click)="refresh()" [disabled]="loading()">
            Refresh
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .page {
        padding: 24px;
        display: flex;
        justify-content: center;
      }

      .card {
        width: 100%;
        max-width: 640px;
      }

      .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 32px 0;
      }

      .details {
        display: grid;
        gap: 16px;
        margin: 0;
      }

      .details div {
        display: grid;
        gap: 4px;
      }

      dt {
        font-weight: 600;
        color: #616161;
      }

      dd {
        margin: 0;
      }

      .error {
        color: #d32f2f;
      }

      .empty {
        color: #757575;
      }

      mat-card-actions {
        display: flex;
        gap: 12px;
      }
    `,
  ],
})
export class Detail {
  private readonly _usersRepository = inject(USERS_REPOSITORY);
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _destroyRef = inject(DestroyRef);

  user = signal<User | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  private _currentUserId: number | null = null;

  constructor() {
    this._route.paramMap.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((paramMap) => {
      const rawId = paramMap.get('id');
      const id = Number(rawId);

      if (rawId === null || Number.isNaN(id)) {
        this._currentUserId = null;
        this.user.set(null);
        this.error.set('Invalid user id');
        this.loading.set(false);
        return;
      }

      if (this._currentUserId === id && this.user()) {
        return;
      }

      this._currentUserId = id;
      void this.loadUser(id);
    });
  }

  refresh() {
    if (this._currentUserId === null) {
      return;
    }

    void this.loadUser(this._currentUserId);
  }

  goBack() {
    void this._router.navigate(['../'], { relativeTo: this._route });
  }

  private async loadUser(id: number) {
    this.loading.set(true);
    this.error.set(null);

    const user = await this._usersRepository.getById(id);

    if (!user) {
      this.error.set('Unable to load user details.');
    }

    this.user.set(user);
    this.loading.set(false);
  }
}
