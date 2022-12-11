import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Post } from '../post.model';
import { map } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private angularFirestore: AngularFirestore) { }

  readAllPosts() {
    return this.angularFirestore
      .collection("posts")
      .snapshotChanges()
  }

  createPost(post: Post) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection("posts")
        .add(post)
        .then(response => { console.log(response) }, error => reject(error))
    })
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