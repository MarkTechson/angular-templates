import { Routes } from '@angular/router';
import { ProductsComponent } from './products.component';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: ':id/:slug',
    loadComponent: () =>
      import('./product-details/product-details.component').then(
        (cmp) => cmp.ProductDetailsComponent,
      ),
  },
];
