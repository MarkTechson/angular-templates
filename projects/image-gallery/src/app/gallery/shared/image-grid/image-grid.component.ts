import {
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { WINDOW } from '@ngx-templates/shared/services';
import { List } from 'immutable';

import { ImageComponent } from './image/image.component';
import { ImageConfig } from '../types';

const COLUMNS_COUNT = 4;
const RESIZE_DEBOUNCE = 100;

@Component({
  selector: 'ig-image-grid',
  standalone: true,
  imports: [ImageComponent],
  templateUrl: './image-grid.component.html',
  styleUrl: './image-grid.component.scss',
})
export class ImageGridComponent {
  private _renderer = inject(Renderer2);
  private _elementRef = inject(ElementRef);
  private _win = inject(WINDOW);
  private _timeout?: ReturnType<typeof setTimeout>;

  images = input.required<List<ImageConfig>>();
  imageClick = output<ImageConfig>();

  columnsCount = signal(COLUMNS_COUNT);

  columns = computed<List<List<ImageConfig>>>(() => {
    let columns = List<List<ImageConfig>>([]);
    const columnsCount = this.columnsCount();

    this.images().forEach((c, i) => {
      const colIdx = i % columnsCount;
      let col = columns.get(colIdx) || List<ImageConfig>([]);
      col = col.push(c);

      columns = columns.set(colIdx, col);
    });

    return columns;
  });

  constructor() {
    this._updateColumnsCount();

    effect(() => {
      const gridTemplateColumns = `repeat(${this.columnsCount()}, 1fr)`;
      this._renderer.setStyle(
        this._elementRef.nativeElement,
        'grid-template-columns',
        gridTemplateColumns,
      );
    });
  }

  @HostListener('window:resize')
  onResize() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    this._timeout = setTimeout(
      () => this._updateColumnsCount(),
      RESIZE_DEBOUNCE,
    );
  }

  private _updateColumnsCount() {
    const width = this._win.innerWidth;
    let cols = COLUMNS_COUNT;

    if (width <= 500) {
      cols = 1;
    } else if (width <= 700) {
      cols = 2;
    } else if (width <= 900) {
      cols = 3;
    }

    if (cols !== this.columnsCount()) {
      this.columnsCount.set(cols);
    }
  }
}
