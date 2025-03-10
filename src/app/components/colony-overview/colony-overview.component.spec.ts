import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColonyOverviewComponent } from './colony-overview.component';

describe('ColonyOverviewComponent', () => {
  let component: ColonyOverviewComponent;
  let fixture: ComponentFixture<ColonyOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColonyOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColonyOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
