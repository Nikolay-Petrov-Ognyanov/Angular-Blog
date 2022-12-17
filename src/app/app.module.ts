import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from "@angular/fire/compat"
import { AngularFirestoreModule } from "@angular/fire/compat/firestore"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FirebaseService } from './services/firebase.service';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PostService } from './services/post.service';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { UpdatePostComponent } from './components/update-post/update-post.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    CreatePostComponent,
    PostDetailsComponent,
    UpdatePostComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDlrW5oNx7-YGL4BZm07sN5WmTtQQTLZDU",
      authDomain: "angularfirebase-9d5d5.firebaseapp.com",
      projectId: "angularfirebase-9d5d5",
      storageBucket: "angularfirebase-9d5d5.appspot.com",
      messagingSenderId: "275218571252",
      appId: "1:275218571252:web:04b5e4d760ac3faa68e3a1"
    }),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [
    FirebaseService,
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
