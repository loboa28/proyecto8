import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { app_routing } from './app.routes';
import { HttpModule } from '@angular/http';

//Componentes
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/shared/nav-bar/nav-bar.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { MainComponent } from './components/main/main.component';
import { ProductoComponent } from './components/producto/producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';

//Servicios
import { UsuariosService } from './services/usuarios.service';
import { ProductosService } from './services/productos.service';
import { CarritoService } from './services/carrito.service';

//Pipes
import { SinFotoPipe } from './pipes/sin-foto.pipe';
import { CapitalizadoPipe } from './pipes/capitalizado.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LogInComponent,
    MainComponent,
    ProductoComponent,
    SinFotoPipe,
    CapitalizadoPipe,
    OrderByPipe,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    app_routing
  ],
  providers: [
    UsuariosService,
    ProductosService,
    CarritoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
