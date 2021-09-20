/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MidbodyComponent } from './midbody.component';

describe('MidbodyComponent', () => {
  let component: MidbodyComponent;
  let fixture: ComponentFixture<MidbodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidbodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
