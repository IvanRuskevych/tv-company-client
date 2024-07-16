import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAgentv1Component } from './new-agentv1.component';

describe('NewAgentComponent', () => {
  let component: NewAgentv1Component;
  let fixture: ComponentFixture<NewAgentv1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAgentv1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(NewAgentv1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
