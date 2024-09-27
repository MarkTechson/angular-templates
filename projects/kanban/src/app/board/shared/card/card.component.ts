import { Component, computed, inject, input, output } from '@angular/core';
import { List } from 'immutable';

import { Card, Label } from '../../../../models';
import { LabelsService } from '../../data-access/labels.service';
import { LabelComponent } from '../label/label.component';

@Component({
  selector: 'kb-card',
  standalone: true,
  imports: [LabelComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  private _labels = inject(LabelsService);

  card = input.required<Card>();
  open = output<Card>();

  labels = computed<List<Label>>(() =>
    this.card()
      .labelIds.map((id) => this._labels.value().get(id)!)
      .toList()
      .sort(),
  );
}
