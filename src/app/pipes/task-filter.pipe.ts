import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task'

@Pipe({
  name: 'taskFilter',
  pure: false
})
export class TaskFilterPipe implements PipeTransform {
  transform(items: Task[], filter: Task): Task[] {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item => (item.assigned_user_id === filter.assigned_user_id));
  }
}

