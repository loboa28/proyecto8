import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizado'
})
export class CapitalizadoPipe implements PipeTransform {
  /*NOTE En la nueva versión de angular, hay que colcoar todos
  los argumentos en variables separadas o en un arreglo utilizando ...*/
  transform(value: string, todas:boolean = true): string {
    value = value.toLowerCase();
    let palabras:string[] = value.split(" ");
    let resultado:string[] = [];

    if( palabras.length >= 1 && palabras[0] != "" ) {
      if( todas ){
        for( let palabra of palabras ) {
          palabra = palabra[0].toUpperCase() + palabra.substr(1);
          resultado.push(palabra);
        }
        return resultado.join(" ");
      } else {
        palabras[0] = palabras[0][0].toUpperCase() + palabras[0].substr(1);
        return palabras.join(" ");
      }
    }

    return "";
  }
}
