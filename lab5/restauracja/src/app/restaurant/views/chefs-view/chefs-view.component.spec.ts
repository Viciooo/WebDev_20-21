import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefsViewComponent } from './chefs-view.component';

describe('ChefsViewComponent', () => {
  let component: ChefsViewComponent;
  let fixture: ComponentFixture<ChefsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChefsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
