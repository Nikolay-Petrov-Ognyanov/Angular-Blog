import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { Post } from '../post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private firestore: AngularFirestore) { }

  readAllPosts() {
    return this.firestore
      .collection("posts")
      .snapshotChanges()
  }

  createPost(post: Post) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("posts")
        .add(post)
        .then(response => { console.log(response) }, error => reject(error))
    })
  }

  readPost(id: string) {
    return this.firestore
      .collection("posts")
      .doc(id)
      .valueChanges()
  }

  updatePost(post: Post, id: string) {
    return this.firestore
      .collection("posts")
      .doc(id)
      .update({
        title: post.title,
        content: post.content
      })
  }

  deletePost(id: string) {
    return this.firestore
      .collection("posts")
      .doc(id)
      .delete()
  }
}