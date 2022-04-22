import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { InputComponent } from './Components/input/input.component';
import { BtnPrincipalComponent } from './Components/btn-principal/btn-principal.component';
import { RegisterPageComponent } from './Components/register-page/register-page.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostComponent } from './Components/post/post.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { InputImageComponent } from './Components/input-image/input-image.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { UserInfoComponent } from './Components/user-info/user-info.component';
import { UpdateUserComponent } from './Components/update-user/update-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    InputComponent,
    BtnPrincipalComponent,
    RegisterPageComponent,
    DashboardComponent,
    PostComponent,
    InputImageComponent,
    UserInfoComponent,
    UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
