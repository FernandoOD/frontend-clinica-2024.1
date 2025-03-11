import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoestimaTestComponent } from './autoestima-test.component';

describe('AutoestimaTestComponent', () => {
  let component: AutoestimaTestComponent;
  let fixture: ComponentFixture<AutoestimaTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoestimaTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoestimaTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
