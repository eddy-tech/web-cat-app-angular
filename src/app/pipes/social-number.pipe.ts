import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'socialNumber',
})
export class SocialNumberPipe implements PipeTransform {
  transform(number: number): any {
    let abs = Math.abs(number);
    const roundDecimalPoints = Math.pow(10, 2);
    const prefix = number < 0 ? '-' : '';
    let key;

    const powers = [
      {
        key: 'Q',
        value: Math.pow(10, 15),
      },
      {
        key: 'T',
        value: Math.pow(10, 12),
      },
      {
        key: 'B',
        value: Math.pow(10, 9),
      },
      {
        key: 'M',
        value: Math.pow(10, 6),
      },
      {
        key: 'K5',
        value: Math.pow(15, 5),
      },
      {
        key: 'K',
        value: Math.pow(10, 3),
      },
    ];

    powers.forEach((power) => {
      let reduced = abs / power.value;
      reduced = Math.round(reduced * roundDecimalPoints) / roundDecimalPoints;
      if (reduced >= 1) {
        abs = reduced;
        key = power.key;
      }
    });

    return prefix + abs + key;
  }
}
