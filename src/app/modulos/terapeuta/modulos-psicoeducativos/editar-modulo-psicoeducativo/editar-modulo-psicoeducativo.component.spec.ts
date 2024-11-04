import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarModuloPsicoeducativoComponent } from './editar-modulo-psicoeducativo.component';

describe('EditarModuloPsicoeducativoComponent', () => {
  let component: EditarModuloPsicoeducativoComponent;
  let fixture: ComponentFixture<EditarModuloPsicoeducativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarModuloPsicoeducativoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarModuloPsicoeducativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
