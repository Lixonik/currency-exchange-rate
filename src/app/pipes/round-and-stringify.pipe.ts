import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundAndStringify'
})
export class RoundAndStringifyPipe implements PipeTransform {
  transform(value: number): string {
    return value.toFixed(2)
  }
}
