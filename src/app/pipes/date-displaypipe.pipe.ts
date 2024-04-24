
import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'sortByDate',
  pure: false // Set to false to ensure the pipe is re-evaluated on changes
})
export class SortByDatePipe implements PipeTransform {
  transform(messages$: Observable<any[]>): Observable<any[]> {
    return messages$.pipe(
      map(messages => messages.slice().sort((a, b) => a.sendDate - b.sendDate))
    );
  }
}
