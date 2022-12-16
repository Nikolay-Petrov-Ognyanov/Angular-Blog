import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './create-post/create-post.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { ProfileComponent } from './profile/profile.component';

let isLoggedIn = !!localStorage.getItem("user")

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomeComponent
  },
  {
    path: isLoggedIn ? "" : "register",
    component: isLoggedIn ? HomeComponent : RegisterComponent
  },
  {
    path: isLoggedIn ? "" : "login",
    component: isLoggedIn ? HomeComponent : LoginComponent
  },
  {
    path: isLoggedIn ? "create" : "",
    component: isLoggedIn ? CreatePostComponent : HomeComponent
  },
  {
    path: "user/:id",
    component: ProfileComponent
  },
  {
    path: "post/:id",
    component: PostDetailsComponent,
  },
  {
    path: "post/:id/update",
    component: UpdatePostComponent
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }