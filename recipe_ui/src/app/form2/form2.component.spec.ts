import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form2Component } from './form2.component';

// http://127.0.0.1:5500/AngularTest/recipe.data.json
describe('Form2Component', () => {
  let component: Form2Component;
  let fixture: ComponentFixture<Form2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Form2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Form2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
