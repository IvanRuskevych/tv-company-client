import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersDashboardComponent } from './customers-dashboard.component';

describe('AgentsTableComponent', () => {
  let component: CustomersDashboardComponent;
  let fixture: ComponentFixture<CustomersDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomersDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
