import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public postService: PostService,
    private router: Router,
    public firestore: AngularFirestore
  ) { }

  post = this.readPost()

  ngOnInit(): void {
    console.log(this.post.createdBy)
  }

  get isLoggedIn() {
    return !!localStorage.getItem("user")
  }

  readPost(): any {
    const postId: any = this.route.snapshot.paramMap.get("id")

    return this.postService.readPost(postId!).subscribe(data => this.post = data)
  }

  updatePost(): any {
    const postId: any = this.route.snapshot.paramMap.get("id")

    this.router.navigate([`post/${postId}/update`])
  }

  deletePost(): any {
    const postId: any = this.route.snapshot.paramMap.get("id")

    this.router.navigate([""])
    return this.postService.deletePost(postId)
  }
}