import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../post.model';
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
    if (this.isLoggedIn) {
      this.currentUserEmail = JSON.parse(localStorage.getItem("user") as any).email
    }

    this.createPostForm = this.formBuilder.group({
      title: [""],
      content: [""],
      author: this.email,
      authorId: this.userId,
      likes: this.likes,
      dislikes: this.dislies
    })

    this.angularFirestore.collection("users").snapshotChanges().subscribe(res => {
      this.users = res.map(u => {
        return {
          id: u.payload.doc.id,
          ...u.payload.doc.data() as {}
        } as User
      })
    })
  }

  getUser: string = localStorage.getItem("user") as string
  email: string = JSON.parse(this.getUser).email
  userId: string = JSON.parse(this.getUser).uid
  likes: string[] = []
  dislies: string[] = []

  public createPostForm: FormGroup

  postId!: string
  uid!: string
  users: any
  currentUserEmail!: string

  get isLoggedIn() {
    return !!localStorage.getItem("user")
  }

  createPost(post: Post, uid: string) {
    if (uid !== undefined) {
      this.uid = uid
    }

    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection("posts")
        .add(post)
        .then(response => {
          this.addPostToUsersCollection(this.uid, response.id)
        }, error => reject(error))
    })
  }

  addPostToUsersCollection(uid: string, postId: string) {
    if (uid !== undefined) {
      this.uid = uid
    }

    const userRef = this.angularFirestore.collection("users").doc(this.uid)

    userRef.get().subscribe(user => {
      if (!user.get("posts")) {
        userRef.set({
          posts: [postId]
        }, {
          merge: true
        })
      } else {
        let postsArray = Array.from(user.get("posts"))

        if (!postsArray.includes(postId)) {
          postsArray.push(postId)

          userRef.update({
            posts: postsArray
          })
        }
      }
    })
  }

  onSubmit(uid: any) {
    if (uid !== undefined) {
      this.uid = uid
    }

    console.log(uid)

    this.createPost(this.createPostForm.value, this.uid)
    this.router.navigate([""])
  }
}