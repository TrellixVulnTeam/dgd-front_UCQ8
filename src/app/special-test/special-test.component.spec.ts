import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialTestComponent } from './special-test.component';

describe('SpecialTestComponent', () => {
  let component: SpecialTestComponent;
  let fixture: ComponentFixture<SpecialTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
