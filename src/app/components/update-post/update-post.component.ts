import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent {
  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.updatePostForm = this.formBuilder.group({
      title: [""],
      content: [""]
    })

    const postId: any = this.route.snapshot.paramMap.get("id")

    this.postService.readPost(postId).subscribe(res => {
      this.postRef = res

      this.updatePostForm = this.formBuilder.group({
        title: [this.postRef.title.trim()],
        content: [this.postRef.content.trim()]
      })
    })
  }

  post = this.readPost()
  postRef: any
  public updatePostForm: FormGroup

  readPost(): any {
    const id: any = this.route.snapshot.paramMap.get("id")

    return this.postService.readPost(id!).subscribe(data => this.post = data)
  }

  onSubmit() {
    const id: any = this.route.snapshot.paramMap.get("id")

    this.postService.updatePost(this.updatePostForm.value, id)
    this.router.navigate([""])
  }

  returnToDetails() {
    const id: any = this.route.snapshot.paramMap.get("id")

    this.router.navigate([`/post/${id}`])
  }
}
