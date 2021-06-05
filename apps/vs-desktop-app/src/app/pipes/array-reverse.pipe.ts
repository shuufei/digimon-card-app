import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({ name: 'arrayReverse' })
export class ArrayReversePipe implements PipeTransform {
  transform<T>(value: T[] = []): T[] {
    return _.reverse([...value]);
  }
}
