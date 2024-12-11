import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtraTestComponent } from './etra-test.component';

describe('EtraTestComponent', () => {
  let component: EtraTestComponent;
  let fixture: ComponentFixture<EtraTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtraTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtraTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
