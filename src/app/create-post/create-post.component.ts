import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { User } from '../user.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  constructor(
    public postService: PostService,
    public formBuilder: FormBuilder,
    public router: Router,
    public angularFirestore: AngularFirestore
  ) {
    this.createPostForm = this.formBuilder.group({
      title: [""],
      content: [""],
      author: this.email,
      authorId: this.userId,
      likes: this.likes,
      dislikes: this.dislies
    })
  }

  getUser: string = localStorage.getItem("user") as string
  email: string = JSON.parse(this.getUser).email
  userId: string = JSON.parse(this.getUser).uid
  likes: string[] = []
  dislies: string[] = []

  public createPostForm: FormGroup

  onSubmit() {
    this.postService.createPost(this.createPostForm.value)
    this.router.navigate([""])
  }
}
