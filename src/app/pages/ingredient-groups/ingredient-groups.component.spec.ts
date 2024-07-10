import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientGroupsComponent } from './ingredient-groups.component';

describe('IngredientGroupsComponent', () => {
  let component: IngredientGroupsComponent;
  let fixture: ComponentFixture<IngredientGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
