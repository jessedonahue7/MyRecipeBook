import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipedisplayComponent } from './recipedisplay.component';

describe('RecipedisplayComponent', () => {
  let component: RecipedisplayComponent;
  let fixture: ComponentFixture<RecipedisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipedisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipedisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
