import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Post } from '../post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private angularFirestore: AngularFirestore) { }

  readAllPosts() {
    return this.angularFirestore
      .collection("posts", ref => ref.orderBy("published", "desc"))
      .snapshotChanges()
  }

  readPost(id: string) {
    return this.angularFirestore
      .collection("posts")
      .doc(id)
      .valueChanges()
  }

  updatePost(post: Post, id: string) {
    return this.angularFirestore
      .collection("posts")
      .doc(id)
      .update({
        title: post.title,
        content: post.content
      })
  }

  deletePost(id: string) {
    return this.angularFirestore
      .collection("posts")
      .doc(id)
      .delete()
  }
}