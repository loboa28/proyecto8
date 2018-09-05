import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Producto } from '../components/shared/Producto.interface';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductosService {

  private productos:Producto[];
  private productosAux:Producto[];
  private url:string
  private termino: string;

//=========================================================================
//  Constructor y métodos de inicialización.
//=========================================================================

  constructor(private http: Http) {
    this.url = "https://tienda-4d5f8.firebaseio.com/productos/.json";
    this.termino = "";
  }

//=========================================================================
//  Métodos principales.
//=========================================================================

  public obtenerProductos() {
    return this.http.get( this.url ).map( res => {
      this.productos = res.json();
      this.productosAux = this.productos;
    } );
  }

  public enviarCantidadProducto(id: number, cantidad: number) {
    let url = `https://tienda-4d5f8.firebaseio.com/productos/${ id }/disponible.json`;
    return this.http.put( url, JSON.stringify(cantidad) );
  }

  public buscarProducto(id:number): Producto {
    for ( let producto of this.productos){
      if(producto.id == id) return producto;
    }
    return null;
  }

  public buscarCoincidencias(termino: string) {
    this.productos = this.productosAux;
    termino = termino.toLowerCase();
    this.termino = termino;
    let coincidentes: Producto[] = [];

    for(let p of this.productos) {
      if(p.nombre.toLowerCase().includes(termino)) {
        coincidentes.push(p);
      }
    }
    this.productos = coincidentes;
  }

  public actualizarCantidad(id:number, cantidad: number, aumentar: boolean) {
    for(let x in this.productos) {
      if(this.productos[x].id == id) {
        this.productos[x].disponible = aumentar ?
          this.productos[x].disponible + cantidad :
          this.productos[x].disponible - cantidad;
      }
    }
    this.productosAux = this.productos;
  }
//=========================================================================
//  Métodos secundarios.
//=========================================================================

  public getTermino() {
    return this.termino;
  }

  public getProductos(): Producto[] {
    return this.productos;
  }

}
