import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeModalComponent } from './joke-modal.component';

describe('JokeModalComponent', () => {
  let component: JokeModalComponent;
  let fixture: ComponentFixture<JokeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JokeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
