import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { UsuariosService } from '../../services/usuarios.service';
import { Producto } from '../../components/shared/Producto.interface';
import { CarritoService } from '../../services/carrito.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  private producto: Producto;

  //========================================================================
  //  Constructor y métodos de inicialización.
  //========================================================================

  constructor(private _usuariosService: UsuariosService,
              private _productoService: ProductosService,
              private _carritoService: CarritoService,
              private router: Router,
              private activeRouter: ActivatedRoute) { }

  ngOnInit() {
    if(!this._usuariosService.isLoged()) {
      this.router.navigate( ['/login'] );
    }else {
      this.activeRouter.params.subscribe( params => {
        if(this._productoService.getProductos()) {
          this.producto = this._productoService.buscarProducto(params['id']);
        } else {
          this._productoService.obtenerProductos().subscribe( () => {
            this.producto = this._productoService.buscarProducto(params['id']);
          })
        }
      });
    }
  }

  //========================================================================
  //  Métodos principales.
  //========================================================================

  private onClickAnadir(item:Producto, c: string, m: string){
    let cantidad: number = parseInt(c);
    let max: number = parseInt(m);

    if(cantidad > 0) {
      if(cantidad <= max) {
        this._carritoService.añadirACarrito(item, cantidad);
        this._productoService.actualizarCantidad(item.id, cantidad, false);
      } else {
        console.log("No hay tantos");
      }
    } else {
      console.log("Invalido");
    }
  }

  //========================================================================
  //  Métodos secundarios.
  //========================================================================

}
