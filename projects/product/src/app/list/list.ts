import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

import { PRODUCTS_REPOSITORY } from 'data';

import type { Product } from 'data';

@Component({
  selector: 'app-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="page">
      <mat-card class="card">
        <div class="header">
          <h2>Products</h2>
        </div>

        <div class="example-container mat-elevation-z8">
          @if (loading()) {
            <div class="example-loading-shade">
              <mat-spinner></mat-spinner>
            </div>
          }

          <div class="example-table-container">
            <table mat-table [dataSource]="products()" class="mat-elevation-z1">
              <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef>#</th>
                <td mat-cell *matCellDef="let product">{{ product.id }}</td>
              </ng-container>

              <ng-container matColumnDef="title">
                <th mat-header-cell *matHeaderCellDef>Title</th>
                <td mat-cell *matCellDef="let product">{{ product.title }}</td>
              </ng-container>

              <ng-container matColumnDef="category">
                <th mat-header-cell *matHeaderCellDef>Category</th>
                <td mat-cell *matCellDef="let product">{{ product.category }}</td>
              </ng-container>

              <ng-container matColumnDef="price">
                <th mat-header-cell *matHeaderCellDef>Price</th>
                <td mat-cell *matCellDef="let product">{{ product.price | currency }}</td>
              </ng-container>

              <ng-container matColumnDef="rating">
                <th mat-header-cell *matHeaderCellDef>Rating</th>
                <td mat-cell *matCellDef="let product">
                  {{ product.rating.rate | number : '1.1-1' }} ({{ product.rating.count }})
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef></th>
                <td mat-cell *matCellDef="let product">
                  <button mat-stroked-button color="primary" (click)="view(product)">View</button>
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

      .mat-column-actions {
        width: 120px;
      }
    `,
  ],
})
export class List implements AfterViewInit {
  private readonly _productsRepository = inject(PRODUCTS_REPOSITORY);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private readonly _allProducts = signal<Product[]>([]);

  products = signal<Product[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  pageIndex = signal(0);
  pageSize = signal(10);

  displayedColumns: string[] = ['id', 'title', 'category', 'price', 'rating', 'actions'];

  ngAfterViewInit() {
    this.loadProducts();
  }

  onPage(event: PageEvent) {
    this.applyPagination(event.pageIndex, event.pageSize);
  }

  view(product: Product) {
    this._router.navigate([product.id], { relativeTo: this._route });
  }

  private async loadProducts() {
    this.loading.set(true);

    try {
      const products = (await this._productsRepository.getAll()) ?? [];

      this._allProducts.set(products);
      this.totalCount.set(products.length);
      this.pageIndex.set(0);

      if (this.paginator) {
        this.paginator.firstPage();
      }

      this.applyPagination(0, this.pageSize());
    } catch (error) {
      console.error('Failed to load products', error);
      this._allProducts.set([]);
      this.products.set([]);
      this.totalCount.set(0);
      this.pageIndex.set(0);
    } finally {
      this.loading.set(false);
    }
  }

  private applyPagination(pageIndex: number, pageSize: number) {
    const allProducts = this._allProducts();
    const totalPages = pageSize > 0 ? Math.ceil(allProducts.length / pageSize) : 0;
    const maxPageIndex = Math.max(totalPages - 1, 0);
    const nextPageIndex = Math.min(pageIndex, maxPageIndex);

    this.pageIndex.set(nextPageIndex);
    this.pageSize.set(pageSize);

    if (this.paginator && this.paginator.pageIndex !== nextPageIndex) {
      this.paginator.pageIndex = nextPageIndex;
    }

    const start = nextPageIndex * pageSize;
    const end = start + pageSize;

    this.products.set(allProducts.slice(start, end));
  }
}
