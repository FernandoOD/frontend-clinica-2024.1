import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTerapeutaComponent } from './dashboard-terapeuta.component';

describe('DashboardTerapeutaComponent', () => {
  let component: DashboardTerapeutaComponent;
  let fixture: ComponentFixture<DashboardTerapeutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTerapeutaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTerapeutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
