import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { CarritoService } from '../../services/carrito.service';
import { ProductosService } from '../../services/productos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from '../../components/shared/Producto.interface';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  private total:number;

//========================================================================
//  Constructor y métodos de inicialización.
//========================================================================

  constructor(private _usuariosService: UsuariosService,
              private router: Router,
              private _carritoService: CarritoService,
              private _productosService: ProductosService,
              private activeRouter: ActivatedRoute)
  {
    this.total = this.calcularTotal();
  }

  ngOnInit() {
    if(!this._usuariosService.isLoged()) {
      this.router.navigate( ['/login'] );
    }
  }

//========================================================================
//  Métodos principales.
//========================================================================

  private calcularTotal(): number {
    let total = 0;
    let c = this._carritoService.getCarrito();
    for( let f in c ) {
      total += c[f].precio * c[f].cantidad;
    }
    return total;
  }

  private vaciar() {
    let car = this._carritoService.getCarrito();
    for( let i of car) {
      this._productosService.actualizarCantidad(i.id, i.cantidad, true);
    }

    this.total = 0;
    this._carritoService.vaciarCarrito();
  }

  private pagar() {
    for( let i of this._carritoService.getCarrito()) {
      let disponible = this._productosService.getProductos()
      .filter((p) => p.id == i.id )
      .map((p) => p.disponible);

      this._productosService.enviarCantidadProducto(i.id, disponible[0])
      .subscribe(() => {
        this.total = 0;
        this._carritoService.vaciarCarrito();
      });
    }
  }

//========================================================================
//  Métodos secundarios.
//========================================================================

}
