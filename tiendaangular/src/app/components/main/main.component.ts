import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { UsuariosService } from '../../services/usuarios.service';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../components/shared/Producto.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private test:string;

  //========================================================================
  //  Constructor y métodos de inicialización.
  //========================================================================

  constructor(private _usuariosService: UsuariosService,
              private _productosService: ProductosService,
              private _carritoService: CarritoService,
              private router: Router) {
    if(!this._usuariosService.isLoged()) {
      this.router.navigate( ['/login'] );
    }
  }

  ngOnInit() {
    if(!this._productosService.getProductos()) {
      this._productosService.obtenerProductos()
      .subscribe(data => this.checkCarrito());
    }
  }

  //========================================================================
  //  Métodos principales.
  //========================================================================

  private checkCarrito() {
    let carrito = this._carritoService.getCarrito();
    for( let i in carrito ) {
      this._productosService.actualizarCantidad(carrito[i].id, carrito[i].cantidad, false);
    }
  }

  private onKeyBusqueda(termino: string) {
    this._productosService.buscarCoincidencias(termino);
  }

  private onClickAnadir(item:Producto, c: string, m: string){
    let cantidad: number = parseInt(c);
    let max: number = parseInt(m);

    if(cantidad > 0) {
      if(cantidad <= max) {
        this._carritoService.añadirACarrito(item, cantidad);
        this._productosService.actualizarCantidad(item.id, cantidad, false);
      } else {
        alert("No hay tantos productos de ese tipo");
      }
    } else {
      alert("Ese no es un valor válido");
    }
  }

  //========================================================================
  //  Métodos secundarios.
  //========================================================================
}
