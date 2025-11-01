import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';

import { PRODUCTS_REPOSITORY } from 'data';

import type { Product } from 'data';

@Component({
  selector: 'app-detail',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule],
  template: `
    <div class="page">
      <mat-card class="card">
        <mat-card-header>
          <mat-card-title>Product Detail</mat-card-title>
          <mat-card-subtitle>
            @if (product(); as p) {
              ID: {{ p.id }}
            } @else {
              Product information
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
          } @else if (product(); as p) {
            <div class="product-layout">
              <div class="media">
                <img [src]="p.image" [alt]="p.title" />
              </div>
              <div class="info">
                <dl class="details">
                  <div>
                    <dt>Title</dt>
                    <dd>{{ p.title }}</dd>
                  </div>
                  <div>
                    <dt>Category</dt>
                    <dd>{{ p.category }}</dd>
                  </div>
                  <div>
                    <dt>Price</dt>
                    <dd>{{ p.price | currency }}</dd>
                  </div>
                  <div>
                    <dt>Rating</dt>
                    <dd>{{ p.rating.rate | number : '1.1-1' }} ({{ p.rating.count }} reviews)</dd>
                  </div>
                  <div>
                    <dt>Description</dt>
                    <dd>{{ p.description }}</dd>
                  </div>
                </dl>
              </div>
            </div>
          } @else {
            <p class="empty">No product selected.</p>
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
        max-width: 960px;
      }

      .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 32px 0;
      }

      .product-layout {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      @media (min-width: 768px) {
        .product-layout {
          flex-direction: row;
        }
      }

      .media {
        display: flex;
        align-items: flex-start;
        justify-content: center;
      }

      .media img {
        max-width: 240px;
        width: 100%;
        border-radius: 8px;
        object-fit: contain;
      }

      .info {
        flex: 1;
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
  private readonly _productsRepository = inject(PRODUCTS_REPOSITORY);
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _destroyRef = inject(DestroyRef);

  product = signal<Product | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  private _currentProductId: number | null = null;

  constructor() {
    this._route.paramMap.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((paramMap) => {
      const rawId = paramMap.get('id');
      const id = Number(rawId);

      if (rawId === null || Number.isNaN(id)) {
        this._currentProductId = null;
        this.product.set(null);
        this.error.set('Invalid product id');
        this.loading.set(false);
        return;
      }

      if (this._currentProductId === id && this.product()) {
        return;
      }

      this._currentProductId = id;
      void this.loadProduct(id);
    });
  }

  refresh() {
    if (this._currentProductId === null) {
      return;
    }

    void this.loadProduct(this._currentProductId);
  }

  goBack() {
    void this._router.navigate(['../'], { relativeTo: this._route });
  }

  private async loadProduct(id: number) {
    this.loading.set(true);
    this.error.set(null);

    try {
      const product = await this._productsRepository.getById(id);

      if (!product) {
        this.error.set('Unable to load product details.');
      }

      this.product.set(product);
    } catch (error) {
      console.error('Failed to load product', error);
      this.error.set('Unable to load product details.');
      this.product.set(null);
    } finally {
      this.loading.set(false);
    }
  }
}
