import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { MainComponent } from './components/main/main.component';
import { ProductoComponent } from './components/producto/producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';

const app_routes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: 'main', component: MainComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'producto/:id', component: ProductoComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

export const app_routing = RouterModule.forRoot(app_routes);
