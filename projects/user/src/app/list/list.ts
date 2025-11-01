import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

import { USERS_REPOSITORY } from 'data';

import type { User } from 'data';

@Component({
  selector: 'app-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="page">
      <mat-card class="card">
        <div class="header">
          <h2>Users</h2>
        </div>

        <div class="example-container mat-elevation-z8">
          @if (loading()) {
            <div class="example-loading-shade">
              <mat-spinner></mat-spinner>
            </div>
          }

          <div class="example-table-container">
            <table mat-table [dataSource]="users()" class="mat-elevation-z1">
              <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef>#</th>
                <td mat-cell *matCellDef="let u">{{ u.id }}</td>
              </ng-container>

              <ng-container matColumnDef="username">
                <th mat-header-cell *matHeaderCellDef>Username</th>
                <td mat-cell *matCellDef="let u">{{ u.username }}</td>
              </ng-container>

              <ng-container matColumnDef="email">
                <th mat-header-cell *matHeaderCellDef>Email</th>
                <td mat-cell *matCellDef="let u">{{ u.email }}</td>
              </ng-container>

              <ng-container matColumnDef="city">
                <th mat-header-cell *matHeaderCellDef>City</th>
                <td mat-cell *matCellDef="let u">{{ u.address.city }}</td>
              </ng-container>

              <ng-container matColumnDef="phone">
                <th mat-header-cell *matHeaderCellDef>Phone</th>
                <td mat-cell *matCellDef="let u">{{ u.phone }}</td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef></th>
                <td mat-cell *matCellDef="let u">
                  <button mat-stroked-button color="primary" (click)="view(u)">View</button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
            </table>
          </div>

          <mat-paginator
            [length]="totalCount()"
            [pageSize]="pageSize()"
            [pageSizeOptions]="[5, 10, 20]"
            (page)="onPage($event)"
            showFirstLastButtons
          />
        </div>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .page {
        padding: 24px;
      }

      .example-container {
        position: relative;
      }
      .example-table-container {
        position: relative;
        min-height: 200px;
        max-height: 400px;
        overflow: auto;
      }

      table {
        width: 100%;
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
      }

      .example-loading-shade {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 56px;
        right: 0;
        background: rgba(0, 0, 0, 0.15);
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .example-rate-limit-reached {
        max-width: 360px;
        text-align: center;
      }
      .mat-column-number,
      .mat-column-state {
        width: 64px;
      }
      .mat-column-created {
        width: 124px;
      }
    `,
  ],
})
export class List implements AfterViewInit {
  private readonly _usersRepository = inject(USERS_REPOSITORY);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  users = signal<User[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  pageIndex = signal(0);
  pageSize = signal(5);

  displayedColumns: string[] = ['id', 'username', 'email', 'city', 'phone', 'actions'];

  ngAfterViewInit() {
    this.loadPage(0, this.pageSize());
  }

  onPage(event: PageEvent) {
    console.log('onPage', { event });
    this.loadPage(event.pageIndex, event.pageSize);
  }

  view(user: User) {
    this._router.navigate([user.id], { relativeTo: this._route });
  }

  private async loadPage(pageIndex: number, pageSize: number) {
    this.loading.set(true);
    const offset = pageIndex * pageSize;
    const limit = pageSize;

    const users = await this._usersRepository.get({ offset, limit });
    console.log('users', { users });

    this.users.set(users ?? []);
    this.pageIndex.set(pageIndex);
    this.pageSize.set(pageSize);
    this.totalCount.set(20);

    this.loading.set(false);
  }
}
