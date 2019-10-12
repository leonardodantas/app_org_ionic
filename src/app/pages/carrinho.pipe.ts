import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carrinho'
})
export class CarrinhoPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
