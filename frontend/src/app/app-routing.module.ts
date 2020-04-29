import { TasksFormComponent } from './components/pages/tasks-form/tasks-form.component';
import { TasksListComponent } from './components/pages/tasks-list/tasks-list.component';
import { StartPageComponent } from './components/pages/start-page/start-page.component';
import { HomeComponent } from './template/layout/home/home.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: StartPageComponent,
  },
  {
    path: 'tarefas',
    component: TasksListComponent,
  },
  {
    path: 'tarefas/:id',
    component: TasksFormComponent,
  },
  {
    path: 'nova-tarefa',
    component: TasksFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
