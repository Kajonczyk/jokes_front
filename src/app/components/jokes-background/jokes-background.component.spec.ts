import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokesBackgroundComponent } from './jokes-background.component';

describe('JokesBackgroundComponent', () => {
  let component: JokesBackgroundComponent;
  let fixture: ComponentFixture<JokesBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JokesBackgroundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokesBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
