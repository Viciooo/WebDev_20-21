import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDishViewComponent } from './single-dish-view.component';

describe('SingleDishViewComponent', () => {
  let component: SingleDishViewComponent;
  let fixture: ComponentFixture<SingleDishViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleDishViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleDishViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
