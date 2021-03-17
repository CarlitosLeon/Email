import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgxSummernoteModule } from 'ngx-summernote';

import { AppComponent } from './app.component';
import { MessageService } from './message.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSummernoteModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
