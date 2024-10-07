import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVistaComponent } from './dashboard-vista.component';

describe('DashboardVistaComponent', () => {
  let component: DashboardVistaComponent;
  let fixture: ComponentFixture<DashboardVistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardVistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
