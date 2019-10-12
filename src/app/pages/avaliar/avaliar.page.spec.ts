import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliarPage } from './avaliar.page';

describe('AvaliarPage', () => {
  let component: AvaliarPage;
  let fixture: ComponentFixture<AvaliarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvaliarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
