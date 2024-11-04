import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTestPsicometricoComponent } from './agregar-test-psicometrico.component';

describe('AgregarTestPsicometricoComponent', () => {
  let component: AgregarTestPsicometricoComponent;
  let fixture: ComponentFixture<AgregarTestPsicometricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarTestPsicometricoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarTestPsicometricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
