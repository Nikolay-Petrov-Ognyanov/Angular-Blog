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

    const postId: any = this.route.snapshot.paramMap.get("id")
    const itemRef = this.angularFirestore.collection('posts').doc(postId)

    itemRef.get().subscribe(post => {
      if (post.get("likes")) {
        let likesArray = Array.from(post.get("likes"))

        if (likesArray.includes(this.user)) {
          this.postIsLikedByCurrentUser = true
          this.postIsDislikedByCurrentUser = false
        }
      }

      if (post.get("dislikes")) {
        let dislikesArray = Array.from(post.get("dislikes"))

        if (dislikesArray.includes(this.user)) {
          this.postIsLikedByCurrentUser = false
          this.postIsDislikedByCurrentUser = true
        }
      }
    })
  }

  user: any
  post = this.readPost()

  postIsLikedByCurrentUser!: boolean
  postIsDislikedByCurrentUser!: boolean

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
          likes: [this.user]
        }, {
          merge: true
        })
      } else {
        let likesArray = Array.from(post.get("likes"))

        if (!likesArray.includes(this.user)) {
          let newUserArray = [this.user]
          let mergeArray = likesArray.concat(newUserArray)

          console.log(mergeArray)

          itemRef.update({
            likes: mergeArray
          })

          this.postIsLikedByCurrentUser = true
          this.postIsDislikedByCurrentUser = false
        }
      }
    })
  }

  dislikePost() {
    const postId: any = this.route.snapshot.paramMap.get("id")
    const itemRef = this.angularFirestore.collection('posts').doc(postId)

    itemRef.get().subscribe(post => {
      if (!post.get("dislikes")) {
        itemRef.set({
          dislikes: [this.user]
        }, {
          merge: true
        })
      } else {
        let dislikesArray = Array.from(post.get("dislikes"))

        if (!dislikesArray.includes(this.user)) {
          let newUserArray = [this.user]
          let mergeArray = dislikesArray.concat(newUserArray)

          console.log(mergeArray)

          itemRef.update({
            dislikes: mergeArray
          })

          this.postIsLikedByCurrentUser = false
          this.postIsDislikedByCurrentUser = true
        }
      }
    })
  }
}