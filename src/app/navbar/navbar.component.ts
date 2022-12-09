import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    public firebaseService: FirebaseService,
    private router: Router
  ) { }

  get isLoggedIn() {
    return !!localStorage.getItem("user")
  }

  @Output() isLoggedOut = new EventEmitter<void>()

  logout() {
    this.firebaseService.logout()
    this.isLoggedOut.emit()
    this.router.navigate(["/"])
  }
}