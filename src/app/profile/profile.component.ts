import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../services/post.service';
import { AngularFirestore } from "@angular/fire/compat/firestore"
import { User } from '../user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(
    public postService: PostService,
    public angularFirestore: AngularFirestore
  ) {
    this.postService
      .readAllPosts()
      .subscribe(res => {
        this.posts = res.map(p => {
          return {
            id: p.payload.doc.id,
            ...p.payload.doc.data() as {}
          } as Post
        })
      })

    this.angularFirestore
      .collection("users")
      .valueChanges()
      .subscribe(users => {
        this.users = users
      })
  }

  ngOnInit(): void { }

  users!: any
  userEmail = JSON.parse(localStorage.getItem("user") as any).email
  posts!: Post[]
}