import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../../../services/carrito.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styles: []
})
export class NavBarComponent implements OnInit {

  //========================================================================
  //  Constructor y métodos de inicialización.
  //========================================================================

  constructor(private router: Router,
              private _carritoService: CarritoService) { }

  ngOnInit() {
  }

  //========================================================================
  //  Métodos principales.
  //========================================================================

  private logOut() {
    sessionStorage.removeItem("Sesion");
    this.router.navigate( ['/login'] );
  }

  //========================================================================
  //  Métodos secundarios.
  //========================================================================

}
