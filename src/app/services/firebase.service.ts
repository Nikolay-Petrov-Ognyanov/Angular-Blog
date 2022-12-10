import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth"
import { catchError } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(
    public angularFireAuth: AngularFireAuth
  ) { }

  get isLoggedIn() {
    return !!localStorage.getItem("user")
  }

  async register(email: string, password: string) {
    if (!localStorage.getItem("user")) {
      await this.angularFireAuth.createUserWithEmailAndPassword(email, password)
        .then(res => {
          localStorage.setItem("user", JSON.stringify(res.user))
        })
        .catch(error => {
          alert(error.code.split("auth/")[1].split("-").join(" "))
        })
    }
  }

  async login(email: string, password: string) {
    if (!localStorage.getItem("user")) {
      await this.angularFireAuth.signInWithEmailAndPassword(email, password)
        .then(res => {
          localStorage.setItem("user", JSON.stringify(res.user))
        })
        .catch(error => {
          alert(error.code.split("auth/")[1].split("-").join(" "))
        })
    }
  }

  logout() {
    this.angularFireAuth.signOut()
    localStorage.removeItem("user")
  }
}