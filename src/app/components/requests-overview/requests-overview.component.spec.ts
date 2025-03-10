import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsOverviewComponent } from './requests-overview.component';

describe('RequestsOverviewComponent', () => {
  let component: RequestsOverviewComponent;
  let fixture: ComponentFixture<RequestsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestsOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
