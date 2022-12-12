import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent {
  constructor(
    private route: ActivatedRoute,
    public postService: PostService,
    private router: Router,
    public angularFirestore: AngularFirestore
  ) {
    if (this.isLoggedIn) {
      this.user = JSON.parse(localStorage.getItem("user") as any).email
    }
  }

  user: any
  post = this.readPost()

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

  likePost() {
    const postId: any = this.route.snapshot.paramMap.get("id")
    const itemRef = this.angularFirestore.collection('posts').doc(postId)

    itemRef.get().subscribe(post => {
      if (!post.get("likes")) {
        itemRef.set({
          likes: 1
        }, {
          merge: true
        })
      } else {
        itemRef.update({
          likes: (post.get("likes")) + 1
        })
      }
    })
  }

  dislikePost() {
    const postId: any = this.route.snapshot.paramMap.get("id")
    const itemRef = this.angularFirestore.collection('posts').doc(postId)

    itemRef.get().subscribe(post => {
      if (!post.get("dislikes")) {
        itemRef.set({
          dislikes: 1
        }, {
          merge: true
        })
      } else {
        itemRef.update({
          dislikes: (post.get("dislikes")) + 1
        })
      }
    })
  }
}