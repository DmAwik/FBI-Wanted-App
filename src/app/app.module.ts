import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderModule } from './shared/header/header.module';
import { SidebarModule } from './modules/sidebar/sidebar.module';
import { AppRoutingModule } from './app-routing.module';
import { CityInterceptor } from './shared/interceptors/city.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    SidebarModule,
    FontAwesomeModule,
    RouterModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: CityInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
