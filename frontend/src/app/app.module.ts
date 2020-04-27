import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './templates/layout/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './template/layout/footer/footer.component';
import { HomeComponent } from './template/layout/home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { StartPageComponent } from './components/pages/start-page/start-page.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { TasksListComponent } from './components/pages/tasks-list/tasks-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    StartPageComponent,
    TasksListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
