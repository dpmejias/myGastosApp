import { Pipe, PipeTransform } from '@angular/core';

import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'ordenTesoreria',
})
export class OrdenTesoreriaPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    return items.slice().sort((a, b) => {
      return a.tipo < b.tipo ? 1 : -1;
      // if (a.tipo === 'ingreso') {
      //   return -1;
      // } else {
      //   return 1;
      // }
    });
  }

}
