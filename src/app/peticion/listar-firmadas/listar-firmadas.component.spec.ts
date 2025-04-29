import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarFirmadasComponent } from './listar-firmadas.component';

describe('ListarFirmadasComponent', () => {
  let component: ListarFirmadasComponent;
  let fixture: ComponentFixture<ListarFirmadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarFirmadasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarFirmadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
