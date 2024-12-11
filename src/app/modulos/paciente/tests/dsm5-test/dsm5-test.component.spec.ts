import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dsm5TestComponent } from './dsm5-test.component';

describe('Dsm5TestComponent', () => {
  let component: Dsm5TestComponent;
  let fixture: ComponentFixture<Dsm5TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dsm5TestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dsm5TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
