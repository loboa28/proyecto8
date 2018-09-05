import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Usuario } from '../components/shared/Usuario.interface';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuariosService {

  private usuarios: Usuario[];
  private url:string;

  //========================================================================
  //  Constructor y métodos de inicialización.
  //========================================================================

  constructor(private http: Http) {
    this.url = "https://tienda-4d5f8.firebaseio.com/usuarios/.json";
  }

  //========================================================================
  //  Métodos principales.
  //========================================================================

  /**
  * Método que obtiene los datos desde servicio de firebase.
  * Regresa un observable
  */
  public getUsuarios() {
    return this.http.get( this.url ).map( res => {
      return this.usuarios = res.json();
      //console.log(this.usuarios.usuarios);
    } );
  }

  public isLoged(): string {
    return sessionStorage.getItem("Sesion");
  }
  //========================================================================
  //  Métodos secundarios.
  //========================================================================

}
