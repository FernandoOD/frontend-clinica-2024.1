import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTestPsicometricoComponent } from './editar-test-psicometrico.component';

describe('EditarTestPsicometricoComponent', () => {
  let component: EditarTestPsicometricoComponent;
  let fixture: ComponentFixture<EditarTestPsicometricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarTestPsicometricoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarTestPsicometricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
