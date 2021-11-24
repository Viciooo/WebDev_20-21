import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfCarsComponent } from './list-of-cars.component';

describe('ListOfCarsComponent', () => {
  let component: ListOfCarsComponent;
  let fixture: ComponentFixture<ListOfCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfCarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
