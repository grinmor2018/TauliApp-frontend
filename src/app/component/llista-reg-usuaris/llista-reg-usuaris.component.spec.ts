import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlistaRegUsuarisComponent } from './llista-reg-usuaris.component';

describe('LlistaRegUsuarisComponent', () => {
  let component: LlistaRegUsuarisComponent;
  let fixture: ComponentFixture<LlistaRegUsuarisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LlistaRegUsuarisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LlistaRegUsuarisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
