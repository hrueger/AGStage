import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageScreenComponent } from './stage-screen.component';

describe('StageScreenComponent', () => {
  let component: StageScreenComponent;
  let fixture: ComponentFixture<StageScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StageScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StageScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
