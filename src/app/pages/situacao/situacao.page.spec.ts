import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SituacaoPage } from './situacao.page';

describe('SituacaoPage', () => {
  let component: SituacaoPage;
  let fixture: ComponentFixture<SituacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SituacaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SituacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
