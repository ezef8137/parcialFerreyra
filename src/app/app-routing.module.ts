import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [
  { path: '', redirectTo: 'listObjets', pathMatch: 'full' },
  { path: 'listObjets', component: ListComponent },
  { path: 'createObjets', component: CreateComponent },
  { path: 'editObjets/:id', component: CreateComponent },
  { path: '**', redirectTo: 'listObjets', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
