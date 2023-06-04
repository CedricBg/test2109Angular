import { Pipe, PipeTransform } from '@angular/core';
import { Customers } from 'src/app/models/customer/customers.models';

@Pipe({
  standalone: true,
  name: 'filterByName'
})
export class filterByName implements PipeTransform {

  transform(items: any[], filter: string): any[] {
    if (!items || !filter) {
      return items;
    }

    return items.filter(item => item.nameCustomer.toLowerCase().includes(filter.toLowerCase()));
  }

}
