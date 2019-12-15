import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Contact } from '../contacts.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  term: string;
  contacts: Contact[] = [];
  subscription: Subscription;

  constructor(private contactService: ContactService) {
    this.contactService.getContacts();
   }

  ngOnInit() {
    this.contactService.getContacts();
    this.subscription =
    this.contactService.contactListChangedEvent.subscribe(
      (contactList: Contact[]) => {
        this.contacts = contactList;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onKeyPress(value: string) {
  this.term = value;
  console.log(this.term);
  }

  search(value: string) {
    this.onKeyPress(value);
  }
}
