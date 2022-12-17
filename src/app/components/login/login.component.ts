import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    public firebaseService: FirebaseService,
    private router: Router
  ) { }

  @ViewChild(
    NgForm,
    {static: true}
  ) form! : ElementRef<HTMLInputElement>

  get isLoggedIn() {
    return !!localStorage.getItem("user")
  }
  
  async onLogin(form: NgForm) {
    if (form.invalid) {
      return
    }

    const {email, password} =  form.value
    
    await this.firebaseService.login(email, password)

    if (localStorage.getItem("user")) {
      this.router.navigate(["/"])
    }
  }
}