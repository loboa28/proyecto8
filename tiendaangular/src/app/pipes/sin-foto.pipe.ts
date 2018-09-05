import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'foto'
})
export class SinFotoPipe implements PipeTransform {

  private url: string = "./assets/img/productos/";
  private defaultUrl: string = "./assets/img/noimage.png";

  transform(value: string): string {
    if( !value ) {
      return this.defaultUrl;
    }

    return ( value != "" ) ? (this.url + value) : this.defaultUrl;
  }

}
