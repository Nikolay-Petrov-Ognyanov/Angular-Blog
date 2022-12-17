import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    public angularFirestore: AngularFirestore
  ) {
    this.angularFirestore
      .collection("users")
      .snapshotChanges()
      .subscribe(res => {
        this.users = res.map(p => {
          return {
            id: p.payload.doc.id,
            ...p.payload.doc.data() as {}
          } as User
        })
      })
  }

  users: any

  get isLoggedIn() {
    return !!localStorage.getItem("user")
  }

  get userEmail() {
    return JSON.parse(localStorage.getItem("user") as any).email
  }

  @Output() isLoggedOut = new EventEmitter<void>()

  logout() {
    this.firebaseService.logout()
    this.isLoggedOut.emit()
    this.router.navigate(["/"])
  }
}