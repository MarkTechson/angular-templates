import { Component, computed, inject } from '@angular/core';

import { AutocompleteProductSearchComponent } from './shared/autocomplete-product-search/autocomplete-product-search.component';
import { CategoryReelComponent } from './shared/category-reel/category-reel.component';
import { CategoriesService } from '../data-access/categories.service';
import { ScrollPosition } from '../shared/scroll-position.service';
import { isProductDetailsRoute } from '../shared/utils/routing';
import { maintainScrollPosEffect } from '../shared/utils/maintain-scroll-pos-effect';
import { HYDRATION_DIRECTIVES } from '../shared/hydration';
import { HydrationService } from '../shared/hydration/hydration.service';
import { CategoryReelSkeletonComponent } from './shared/category-reel-skeleton/category-reel-skeleton.component';

// Limit the number of categories
// that are shown on the home page.
const CATEGORY_REELS_COUNT = 3;

@Component({
  selector: 'ec-home',
  standalone: true,
  imports: [
    AutocompleteProductSearchComponent,
    CategoryReelComponent,
    CategoryReelSkeletonComponent,
    HYDRATION_DIRECTIVES,
  ],
  providers: [ScrollPosition],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private _categories = inject(CategoriesService);
  hydration = inject(HydrationService);

  categories = computed(() =>
    this._categories.categoriesList().take(CATEGORY_REELS_COUNT),
  );

  constructor() {
    maintainScrollPosEffect(isProductDetailsRoute);
  }
}
