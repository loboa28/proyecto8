import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../shared/Usuario.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  private email: string;
  private pass: string;
  private loginFail: boolean;

//========================================================================
//  Constructor y métodos de inicialización.
//========================================================================

  constructor(
    private _usuariosService: UsuariosService,
    private router: Router){
      if(this._usuariosService.isLoged()) this.router.navigate( ['/main'] );
  }

  ngOnInit() {
    this.email = "";
    this.pass = "";
    this.loginFail = false;
  }

//========================================================================
//  Métodos principales.
//========================================================================

  private checkLogin(b) {
    if(!b.disabled) {
      this._usuariosService.getUsuarios().subscribe((data:Usuario[]) => {
        const hola = data;
        if(hola.length != 0) {
          for( let x in data) {
            if(data[x].user == this.email.toLowerCase()
            && data[x].pass == this.pass) {
              sessionStorage.setItem("Sesion", this.email);
              this.router.navigate( ['/main'] );
              this.loginFail = false;
              console.log("Login OK");
              return 0;
            }
          }
          this.loginFail = true;
          console.log("Login NO");
        } else {
          console.log("No hay usuarios registrados wtf?")
        }
      });
    }
  }

//========================================================================
//  Métodos secundarios.
//========================================================================

}
