import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'signPrefix'
})
export class SignPrefixPipe implements PipeTransform {
  transform(value: string): string {
    return Number(value) > 0 ? `+${value}` : value
  }

}
