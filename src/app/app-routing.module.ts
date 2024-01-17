import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNoteComponent } from './pages/add-note/add-note.component';
import { HomeComponent } from './pages/home/home.component';
import { EditingComponent } from './pages/editing/editing.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'add-note',
    component: AddNoteComponent,
    title: 'add-note'
  }, 
  {
    path: 'editing-note',
    component: EditingComponent,
    title: 'edition-note'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
