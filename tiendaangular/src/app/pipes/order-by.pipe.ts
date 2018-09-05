import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../components/shared/Producto.interface';

@Pipe({
  name: 'sort'
})
export class OrderByPipe implements PipeTransform {

  transform(value: Array<Producto>, args: string = "ABC"): any {
    if(value.length != 0) {
      if(args == "CBA") {
        value.sort( (a, b) => {
          return (a.nombre < b.nombre) ? 1 : -1 ;
        });
      } else {
        value.sort( (a, b) => {
          return (a.nombre > b.nombre) ? 1 : -1;
        });
      }
    }
    return value;
  }
}
