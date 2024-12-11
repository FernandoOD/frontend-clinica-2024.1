import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarModuloPsicoeducativoComponent } from './agregar-modulo-psicoeducativo.component';

describe('AgregarModuloPsicoeducativoComponent', () => {
  let component: AgregarModuloPsicoeducativoComponent;
  let fixture: ComponentFixture<AgregarModuloPsicoeducativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarModuloPsicoeducativoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarModuloPsicoeducativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
