import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  constructor(
    public postService: PostService,
    public formBuilder: FormBuilder,
    public router: Router
    ) {
      this.createPostForm = this.formBuilder.group({
        title: [""],
        content: [""]
      })
    }
    
  public createPostForm: FormGroup
  
  onSubmit() {
    this.postService.createPost(this.createPostForm.value)
    this.router.navigate([""])
  }
}
