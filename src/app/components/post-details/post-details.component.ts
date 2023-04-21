import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { User } from '../../models/user.model';

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
            this.currentUserEmail = JSON.parse(localStorage.getItem("user") as any).email
        }

        const postId: any = this.route.snapshot.paramMap.get("id")
        const postRef = this.angularFirestore.collection('posts').doc(postId)

        postRef.get().subscribe(post => {
            if (post.get("likes")) {
                let likesArray = Array.from(post.get("likes"))

                if (likesArray.includes(this.currentUserEmail)) {
                    this.postIsLikedByThisUser = true
                    this.postIsDislikedByThisUser = false
                }
            }

            if (post.get("dislikes")) {
                let dislikesArray = Array.from(post.get("dislikes"))

                if (dislikesArray.includes(this.currentUserEmail)) {
                    this.postIsLikedByThisUser = false
                    this.postIsDislikedByThisUser = true
                }
            }
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

    userId: any
    currentUserEmail: any
    users: any
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

    deletePost(uid: any): any {
        if (confirm("Are you sure you want to delete this post?")) {
            if (uid !== undefined) {
                this.userId = uid
            }

            const userRef = this.angularFirestore.collection("users").doc(this.userId)
            const postId: any = this.route.snapshot.paramMap.get("id")

            userRef.get().subscribe(user => {
                if (user.get("posts")) {
                    let postsArray = Array.from(user.get("posts"))

                    if (postsArray.includes(postId)) {
                        let indexOfThisPost = postsArray.indexOf(postId)

                        postsArray.splice(indexOfThisPost, 1)

                        userRef.update({
                            posts: postsArray
                        })
                    }
                }
            })

            this.router.navigate([""])

            return this.postService.deletePost(postId)
        }
    }

    likePost(uid: any) {
        if (uid !== undefined) {
            this.userId = uid
        }

        this.postIsLikedByThisUser = true
        this.postIsDislikedByThisUser = false

        const userRef = this.angularFirestore.collection("users").doc(this.userId)
        const postId: any = this.route.snapshot.paramMap.get("id")
        const postRef = this.angularFirestore.collection('posts').doc(postId)

        userRef.get().subscribe(user => {
            if (!user.get("likes")) {
                userRef.set({
                    likes: [postId]
                }, {
                    merge: true
                })
            } else {
                let likesArray = Array.from(user.get("likes"))

                if (!likesArray.includes(postId)) {
                    likesArray.push(postId)

                    userRef.update({
                        likes: likesArray
                    })
                }
            }

            if (user.get("dislikes")) {
                let dislikesArray = Array.from(user.get("dislikes"))

                if (dislikesArray.includes(postId)) {
                    let indexOfThisPost = dislikesArray.indexOf(postId)

                    dislikesArray.splice(indexOfThisPost, 1)

                    userRef.update({
                        dislikes: dislikesArray
                    })
                }
            }
        })

        postRef.get().subscribe(post => {
            if (!post.get("likes")) {
                postRef.set({
                    likes: [this.currentUserEmail]
                }, {
                    merge: true
                })
            } else {
                let likesArray = Array.from(post.get("likes"))

                if (!likesArray.includes(this.currentUserEmail)) {
                    likesArray.push(this.currentUserEmail)

                    postRef.update({
                        likes: likesArray
                    })
                }
            }

            if (post.get("dislikes")) {
                let dislikesArray = Array.from(post.get("dislikes"))

                if (dislikesArray.includes(this.currentUserEmail)) {
                    let indexOfThisUser = dislikesArray.indexOf(this.currentUserEmail)

                    dislikesArray.splice(indexOfThisUser, 1)

                    postRef.update({
                        dislikes: dislikesArray
                    })
                }
            }
        })
    }

    dislikePost(uid: any) {
        if (uid !== undefined) {
            this.userId = uid
        }

        this.postIsLikedByThisUser = false
        this.postIsDislikedByThisUser = true

        const postId: any = this.route.snapshot.paramMap.get("id")
        const postRef = this.angularFirestore.collection('posts').doc(postId)
        const userRef = this.angularFirestore.collection("users").doc(this.userId)

        userRef.get().subscribe(user => {
            if (!user.get("dislikes")) {
                userRef.set({
                    dislikes: [postId]
                }, {
                    merge: true
                })
            } else {
                let dislikesArray = Array.from(user.get("dislikes"))

                if (!dislikesArray.includes(postId)) {
                    dislikesArray.push(postId)

                    userRef.update({
                        dislikes: dislikesArray
                    })
                }
            }

            if (user.get("likes")) {
                let likesArray = Array.from(user.get("likes"))

                if (likesArray.includes(postId)) {
                    let indexOfThisPost = likesArray.indexOf(postId)

                    likesArray.splice(indexOfThisPost, 1)

                    userRef.update({
                        likes: likesArray
                    })
                }
            }
        })

        postRef.get().subscribe(post => {
            if (!post.get("dislikes")) {
                postRef.set({
                    dislikes: [this.currentUserEmail]
                }, {
                    merge: true
                })
            } else {
                let dislikesArray = Array.from(post.get("dislikes"))

                if (!dislikesArray.includes(this.currentUserEmail)) {
                    dislikesArray.push(this.currentUserEmail)

                    postRef.update({
                        dislikes: dislikesArray
                    })
                }
            }

            if (post.get("likes")) {
                let likesArray = Array.from(post.get("likes"))

                if (likesArray.includes(this.currentUserEmail)) {
                    let indexOfThisUser = likesArray.indexOf(this.currentUserEmail)

                    likesArray.splice(indexOfThisUser, 1)

                    postRef.update({
                        likes: likesArray
                    })
                }
            }
        })
    }
}