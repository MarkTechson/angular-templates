import { Component, inject } from '@angular/core';
import { ProductsService } from '../state/products.service';
import { ThemeService } from '../shared/theme.service';
import { CategoriesService } from '../state/categories.service';

@Component({
  selector: 'ec-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  products = inject(ProductsService);
  categories = inject(CategoriesService);
  theme = inject(ThemeService);

  getProducts() {
    this.products.loadProducts();
  }

  getProduct() {
    this.products.loadProduct('5551');
  }
}
