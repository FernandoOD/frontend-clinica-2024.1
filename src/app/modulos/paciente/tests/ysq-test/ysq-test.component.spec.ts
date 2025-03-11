import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YsqTestComponent } from './ysq-test.component';

describe('YsqTestComponent', () => {
  let component: YsqTestComponent;
  let fixture: ComponentFixture<YsqTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YsqTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YsqTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
