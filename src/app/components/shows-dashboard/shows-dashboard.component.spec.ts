import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsDashboardComponent } from './shows-dashboard.component';

describe('AgentsTableComponent', () => {
  let component: ShowsDashboardComponent;
  let fixture: ComponentFixture<ShowsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowsDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
