import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxTest1Component } from './ngrx-test1.component';

describe('NgrxTest1Component', () => {
  let component: NgrxTest1Component;
  let fixture: ComponentFixture<NgrxTest1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgrxTest1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgrxTest1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
