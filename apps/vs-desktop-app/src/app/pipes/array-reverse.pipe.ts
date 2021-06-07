import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

// TODO: pure: trueにしたいが、進化元破棄したときに画面描画が更新されなくなってしまう
@Pipe({ name: 'arrayReverse', pure: false })
export class ArrayReversePipe implements PipeTransform {
  transform<T>(value: T[] = []): T[] {
    return _.reverse([...value]);
  }
}
