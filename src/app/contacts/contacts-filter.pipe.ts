import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contacts.model';

@Pipe({
  name: 'contactsFilter',
  pure: false
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[] = [], term: string): any {
    let filteredArray: Contact[] = [];

    if (term && term.length > 0) {
    filteredArray = contacts.filter(
      (contact: Contact) => contact.name.toLowerCase().includes(term.toLowerCase())
    );
    }

    if (filteredArray.length < 1) {
    return contacts;
    }

    return filteredArray;
  }

}
