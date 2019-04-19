import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMenuPrincipalComponent } from './nav-menu-principal.component';

describe('NavMenuPrincipalComponent', () => {
  let component: NavMenuPrincipalComponent;
  let fixture: ComponentFixture<NavMenuPrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavMenuPrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMenuPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
