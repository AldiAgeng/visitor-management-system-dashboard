import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUser } from './create-user.component';

describe('CreateUser', () => {
  let component: CreateUser;
  let fixture: ComponentFixture<CreateUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
