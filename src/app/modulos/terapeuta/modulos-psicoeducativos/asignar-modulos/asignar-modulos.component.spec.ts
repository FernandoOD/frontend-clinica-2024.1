import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarModulosComponent } from './asignar-modulos.component';

describe('AsignarModulosComponent', () => {
  let component: AsignarModulosComponent;
  let fixture: ComponentFixture<AsignarModulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarModulosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarModulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
