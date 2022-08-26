import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';
import * as advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);

@Pipe({
  name: 'dayJS',
})
export class DayJSPipe implements PipeTransform {
  transform(value: string, format: string): string {
    return dayjs(value).format(format);
  }
}
