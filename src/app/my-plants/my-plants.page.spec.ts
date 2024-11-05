import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyPlantsPage } from './my-plants.page';

describe('MyPlantsPage', () => {
  let component: MyPlantsPage;
  let fixture: ComponentFixture<MyPlantsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPlantsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
