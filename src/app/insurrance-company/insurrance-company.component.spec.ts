import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurranceCompanyComponent } from './insurrance-company.component';

describe('InsurranceCompanyComponent', () => {
  let component: InsurranceCompanyComponent;
  let fixture: ComponentFixture<InsurranceCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsurranceCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurranceCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
