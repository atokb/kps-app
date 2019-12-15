import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contacts.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ContactService {
  contacts: Contact[] = [];
  maxContactId: number;

  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();

  constructor(private http: HttpClient,
              private contactService: ContactService) {
    this.maxContactId = this.getMaxId();
  }

  getContacts() {
    this.http.get('https://kps-app-41271.firebaseio.com/contacts.json')
    .subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a, b) => (a['name'] < b['name']) ? 1 : (a['name'] > b['name']) ? -1 : 0);
        this.contactListChangedEvent.next(this.contacts.slice());
        },

        (error: any) => {
          console.log('There was an error in fetching data.');
      }
    );
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
      for (const contact of this.contacts) {
        if (contact.id === id) {
          return contact;
        }
      }
      return null;
  }

  deleteContact (contact: Contact) {
    if (contact === null) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    this.storeContact();
  }

  getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
        return maxId;
      }
    }
  }

  addContact(newContact: Contact) {
    if (newContact === (undefined || null)) {
      return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContact();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if ((originalContact || newContact) === (undefined || null)) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0 ) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContact();
  }

  storeContact() {
    this.contacts = JSON.parse(JSON.stringify(this.contacts));
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put('https://kps-app-41271.firebaseio.com/contacts.json',
    this.contacts, { headers: header }).subscribe ((contacts: Contact[]) => {
      this.contactListChangedEvent.next(this.contacts.slice());
    });
  }
}
