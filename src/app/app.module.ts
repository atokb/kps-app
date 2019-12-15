import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NgSurveysModule } from 'ng-surveys';
import { AppComponent } from './app.component';
import {ShellModule} from './shell/shell.module';
import {AppRoutingModule} from './app-routing.module';
import {BuilderViewerContainerComponent} from './layouts/builder-viewer-container/builder-viewer-container.component';
import {HttpClientModule} from '@angular/common/http';
import { SurveyViewerContainerComponent } from './layouts/survey-viewer-container/survey-viewer-container.component';
import { DropdownDirective } from './dropdown.directive';

import { ContactsComponent } from './contacts/contacts.component';
import { UserComponent } from './users/users.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactsDetailComponent} from './contacts/contact-detail/contact-detail.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';
import { DndModule } from 'ng2-dnd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactsFilterPipe } from './contacts/contacts-filter.pipe';
import { WindRefService } from './wind-ref.service';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/auth.guard';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';
import { UserResolver } from './users/user.resolver';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ShellModule,
    NgSurveysModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DndModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  declarations: [
    AppComponent,
    BuilderViewerContainerComponent,
    SurveyViewerContainerComponent,
    DropdownDirective,
    ContactsComponent,
    UserComponent,
    ContactListComponent,
    ContactEditComponent,
    ContactsDetailComponent,
    ContactItemComponent,
    DropdownDirective,
    RegisterComponent,
    LoginComponent,
    ContactsFilterPipe,
    UserComponent,
    ContactsDetailComponent,
  ],
  providers: [WindRefService, AuthService, UserService, UserResolver, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
