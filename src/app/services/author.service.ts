import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorService implements CanActivate {

  constructor(
    private router: Router,
    public angularFirestore: AngularFirestore
  ) { }

  isAuthor!: boolean

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): any {
    const postId: any = route.paramMap.get("id")
    const postRef = this.angularFirestore.collection('posts').doc(postId)

    if (!!localStorage.getItem("user") == true) {
      postRef.get().subscribe(post => {
        if (post.get("author") == JSON.parse(localStorage.getItem("user") as any).email) {
          return true
        } else {
          this.router.navigate([""])

          return false
        }
      })
    } else {
      this.router.navigate([""])

      return false
    }
  }
}
