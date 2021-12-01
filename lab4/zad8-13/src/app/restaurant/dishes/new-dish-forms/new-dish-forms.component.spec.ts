import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDishFormsComponent } from './new-dish-forms.component';

describe('NewDishFormsComponent', () => {
  let component: NewDishFormsComponent;
  let fixture: ComponentFixture<NewDishFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDishFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDishFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
