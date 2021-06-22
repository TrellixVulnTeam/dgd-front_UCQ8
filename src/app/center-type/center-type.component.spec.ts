import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterTypeComponent } from './center-type.component';

describe('CenterTypeComponent', () => {
  let component: CenterTypeComponent;
  let fixture: ComponentFixture<CenterTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
