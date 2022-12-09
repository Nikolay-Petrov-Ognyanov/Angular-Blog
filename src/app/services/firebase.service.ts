import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth"

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(
    public firebaseAuth: AngularFireAuth
  ) { }

  get isLoggedIn() {
    return !!localStorage.getItem("user")
  }

  async register(email: string, password: string) {
    if (!localStorage.getItem("user")) {
      await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
        .then(res => {
          localStorage.setItem("user", JSON.stringify(res.user))
        })
        .catch(error => {
          console.log(error.message)
        })
    }
  }

  async login(email: string, password: string) {
    if (!localStorage.getItem("user")) {
      await this.firebaseAuth.signInWithEmailAndPassword(email, password)
        .then(res => {
          localStorage.setItem("user", JSON.stringify(res.user))
        })
        .catch(error => {
          console.log(error.message)
        })
    }
  }

  logout() {
    this.firebaseAuth.signOut()
    localStorage.removeItem("user")
  }
}