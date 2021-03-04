import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterStackComponent } from './filter-stack.component';

describe('FilterStackComponent', () => {
  let component: FilterStackComponent;
  let fixture: ComponentFixture<FilterStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterStackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
