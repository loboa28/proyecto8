import { Injectable } from '@angular/core';
import { Producto, Item } from '../components/shared/Producto.interface';

@Injectable()
export class CarritoService {

//========================================================================
//  Constructor y métodos de inicialización.
//========================================================================
  private carrito: Item[];

  constructor() {
    this.cargarCarrito();
  }

//=======================================================================
//  Métodos principales.
//=======================================================================

  public añadirACarrito(p: Producto, cantidad: number) {
    let item: Item = {
      "id": p.id,
      "nombre": p.nombre,
      "precio": p.precio,
      "cantidad": cantidad,
      "url": p.url
    }

    if(this.carrito.length > 0) {
      let encontrados = this.carrito.filter( i => i.id == p.id);

      if( encontrados.length > 0 ) {
        encontrados.forEach( i => i.cantidad += cantidad);
      } else {
        this.carrito.push(item);
      }
    } else {
      this.carrito.push(item);
    }

    sessionStorage.setItem("carrito", JSON.stringify(this.carrito));
  }

  public eliminarDeCarrito(id: number) {
    for( let f in this.carrito ) {
      if( this.carrito[f].id == id ) {
        this.carrito.splice( parseInt(f), 1 );
      }
    }
  }

  public vaciarCarrito() {
    this.carrito = [];
    sessionStorage.setItem("carrito", JSON.stringify(this.carrito));
  }

  public cargarCarrito() {
    let sc = JSON.parse(sessionStorage.getItem("carrito"));
    this.carrito = sc ? sc : [] ;
  }

//=======================================================================
//  Métodos secundarios.
//=======================================================================
  public getCarrito(): Item[] {
    return this.carrito;
  }
}
