import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from './shell/shell.service';
import {BuilderViewerContainerComponent} from './layouts/builder-viewer-container/builder-viewer-container.component';
import {SurveyViewerContainerComponent} from './layouts/survey-viewer-container/survey-viewer-container.component';
import {ContactsComponent} from './contacts/contacts.component';
import {ContactEditComponent} from './contacts/contact-edit/contact-edit.component';
import {ContactsDetailComponent} from './contacts/contact-detail/contact-detail.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {UserComponent} from './users/users.component';
import {AuthGuard } from './core/auth.guard';
import {UserResolver} from './users/user.resolver';


export const routes: Routes = [

      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
      { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  Shell.childRoutes(
    [
      { path: 'user', component: UserComponent,  resolve: { data: UserResolver}},
      { path: 'builder', component: BuilderViewerContainerComponent},
      { path: 'viewer', component: SurveyViewerContainerComponent},
      { path: 'viewer/:pageId', component: SurveyViewerContainerComponent},
      { path: 'contact', component: ContactsComponent, children: [
        {path: 'new', component: ContactEditComponent},
        {path: ':id', component: ContactsDetailComponent},
        {path: ':id/edit', component: ContactEditComponent},
      ]},
      { path: '**', component: LoginComponent}
    ]),

  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
