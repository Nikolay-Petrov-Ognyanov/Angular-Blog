import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { AngularFirestore } from "@angular/fire/compat/firestore"
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(
    public postService: PostService,
    public angularFirestore: AngularFirestore,
    private route: ActivatedRoute
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

    const userId: any = this.route.snapshot.paramMap.get("id")

    this.angularFirestore
      .collection("users")
      .doc(userId).valueChanges()
      .subscribe(user => this.userFromRoute = user)
  }

  ngOnInit(): void { }

  get currentUser() {
    return JSON.parse(localStorage.getItem("user") as any)
  }

  userFromRoute: any
  users!: any
  authorEmail = JSON.parse(localStorage.getItem("user") as any).email
  posts!: Post[]
}