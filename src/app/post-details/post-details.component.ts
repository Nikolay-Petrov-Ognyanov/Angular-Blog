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
          this.postIsLikedByThisUser = true
          this.postIsDislikedByThisUser = false
        }
      }

      if (post.get("dislikes")) {
        let dislikesArray = Array.from(post.get("dislikes"))

        if (dislikesArray.includes(this.user)) {
          this.postIsLikedByThisUser = false
          this.postIsDislikedByThisUser = true
        }
      }
    })
  }

  user: any
  post = this.readPost()

  postIsLikedByThisUser!: boolean
  postIsDislikedByThisUser!: boolean

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
    this.postIsLikedByThisUser = true
    this.postIsDislikedByThisUser = false

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
          likesArray.push(this.user)
         
          itemRef.update({
            likes: likesArray
          })   
        }
      }

      if (post.get("dislikes")) {
        let dislikesArray = Array.from(post.get("dislikes"))

        if (dislikesArray.includes(this.user)) {
          let indexOfThisUser = dislikesArray.indexOf(this.user)

          dislikesArray.splice(indexOfThisUser, 1)

          itemRef.update({
            dislikes:dislikesArray
          })
        }
      }
    })
  }

  dislikePost() {
    this.postIsLikedByThisUser = false
    this.postIsDislikedByThisUser = true

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
          dislikesArray.push(this.user)
         
          itemRef.update({
            dislikes: dislikesArray
          })
        }
      }

      if (post.get("likes")) {
        let likesArray = Array.from(post.get("likes"))

        if (likesArray.includes(this.user)) {
          let indexOfThisUser = likesArray.indexOf(this.user)
          likesArray.splice(indexOfThisUser, 1)

          itemRef.update({
            likes:likesArray
          })
        }
      }
    })
  }
}