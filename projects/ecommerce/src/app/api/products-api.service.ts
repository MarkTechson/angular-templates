import { Injectable, inject } from '@angular/core';
import { List } from 'immutable';

import { Product } from '../state/models';
import { FETCH_API, fetchAbort } from '../shared/fetch';
import { environment } from '../../environments/environment';
import { mapProduct, mapProducts } from './utils/mappers';
import { buildQueryParamsString } from './utils/query-params-builder';

@Injectable()
export class ProductsApi {
  private _abortIfInProgress = fetchAbort();
  private _fetch = inject(FETCH_API);

  /**
   * Fetches products
   *
   * @returns A products list that matches the given criteria
   */
  async getProducts(
    params?: Partial<{
      categoryId: string;
      pageSize: number;
      page: number;
    }>,
  ): Promise<List<Product>> {
    const signal = this._abortIfInProgress(this.getProducts.name);
    const queryParams = buildQueryParamsString(params);

    const response = await this._fetch(
      `${environment.apiUrl}/products${queryParams}`,
      {
        signal,
      },
    );
    const json = await response.json();

    return mapProducts(json);
  }

  /**
   * Fetches the complete data of a product
   *
   * @param id
   * @returns A product
   */
  async getProduct(id: string): Promise<Product> {
    const signal = this._abortIfInProgress(this.getProduct.name);
    const response = await this._fetch(`${environment.apiUrl}/products/${id}`, {
      signal,
    });
    const json = await response.json();

    return mapProduct(json);
  }
}
