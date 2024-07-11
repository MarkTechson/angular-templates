import { ComponentFixture, TestBed } from '@angular/core/testing';
import { windowProvider } from '@ngx-templates/shared/services';

import { HomeComponent } from './home.component';
import { CategoriesService } from '../data-access/categories.service';
import { fetchApiMockProvider } from '../shared/utils/fetch-mock-provider';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [windowProvider, fetchApiMockProvider, CategoriesService],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
