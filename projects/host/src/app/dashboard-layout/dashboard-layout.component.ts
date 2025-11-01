import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

type NavLink = {
  label: string;
  path: string;
  exact?: boolean;
};

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
  // templateUrl: './dashboard-layout.component.html',
  template: `
    <mat-sidenav-container class="layout">
      <mat-sidenav #sidenav class="sidebar" mode="side" opened>
        <header class="sidebar__header">
          <span class="sidebar__title">Fakestore</span>
        </header>

        <mat-nav-list>
          @for (link of links(); track link.path) {
            <a
              mat-list-item
              [routerLink]="link.path"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: link.exact ?? false }"
              (click)="sidenav.mode === 'over' && sidenav.close()"
            >
              {{ link.label }}
            </a>
          }
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary" class="toolbar">
          <button
            type="button"
            mat-icon-button
            class="toolbar__menu"
            aria-label="Toggle navigation"
            (click)="sidenav.toggle()"
          >
            <mat-icon>menu</mat-icon>
          </button>

          <span class="toolbar__title">Dashboard</span>
          <span class="toolbar__spacer"></span>
          <a mat-button routerLink="/auth">Log out</a>
        </mat-toolbar>

        <main class="content">
          <router-outlet />
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  // styleUrl: './dashboard-layout.component.scss',
  styles: [
    `
      :host {
        display: block;
        height: 100vh;
      }

      .layout {
        height: 100%;
        background: #f5f5f5;
      }

      .sidebar {
        width: 240px;
        border-right: none;
      }

      .sidebar__header {
        padding: 24px 16px 8px;
      }

      .sidebar__title {
        font-size: 1.25rem;
        font-weight: 600;
      }

      .toolbar {
        position: sticky;
        top: 0;
        z-index: 1;
      }

      .toolbar__menu {
        margin-right: 8px;
      }

      .toolbar__title {
        font-weight: 500;
        font-size: 1.125rem;
      }

      .toolbar__spacer {
        flex: 1 1 auto;
      }

      .content {
        padding: 24px;
        min-height: calc(100vh - 64px);
        box-sizing: border-box;
        background: #fff;
      }

      a.active {
        font-weight: 600;
      }

      @media (min-width: 768px) {
        .toolbar__menu {
          display: none;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent {
  private readonly linksConfig: NavLink[] = [
    { label: 'Overview', path: '/dashboard', exact: true },
    { label: 'Users', path: '/user' },
    { label: 'Products', path: '/product' },
  ];

  readonly links = computed(() => this.linksConfig);
}
