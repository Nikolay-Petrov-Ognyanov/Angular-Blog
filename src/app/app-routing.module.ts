import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './create-post/create-post.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthorService } from './services/author.service';
import { IsLoggedOutService } from './services/is-logged-out.service';
import { IsLoggedInService } from './services/is-logged-in.service';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomeComponent
  },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [IsLoggedOutService]
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [IsLoggedOutService]
  },
  {
    path: "create",
    component: CreatePostComponent,
    canActivate: [IsLoggedInService]
  },
  {
    path: "user/:id",
    component: ProfileComponent,
    canActivate: [IsLoggedInService]
  },
  {
    path: "post/:id",
    component: PostDetailsComponent,
  },
  {
    path: "post/:id/update",
    component: UpdatePostComponent,
    canActivate: [AuthorService]
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