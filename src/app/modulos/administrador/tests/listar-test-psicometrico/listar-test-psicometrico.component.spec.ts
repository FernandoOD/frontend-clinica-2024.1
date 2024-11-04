import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTestPsicometricoComponent } from './listar-test-psicometrico.component';

describe('ListarTestPsicometricoComponent', () => {
  let component: ListarTestPsicometricoComponent;
  let fixture: ComponentFixture<ListarTestPsicometricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarTestPsicometricoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarTestPsicometricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
