import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Post } from '../post.model';
import { map } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class PostService {
  // postsCollection!: AngularFirestoreCollection<Post>
  // postDoc!: AngularFirestoreDocument<Post>

  constructor(
    private angularFirestore: AngularFirestore,
  ) {
    // this.postsCollection = this.angularFirestore
    //   .collection("posts", ref => ref.orderBy("published", "desc"))
  }

  // readAllPosts() {
  //   return this.postsCollection.snapshotChanges().map(actions => {
  //     return actions.map(action => {
  //       const data = action.payload.doc.data() as Post
  //       const id = action.payload.doc.id

  //       return { id, ...data }
  //     })
  //   })
  // }

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

  deletePost(post: Post) {
    return this.angularFirestore
      .collection("posts")
      .doc(post.id)
      .delete()
  }
}
