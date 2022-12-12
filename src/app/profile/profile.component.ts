import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(
    public postService: PostService,
  ) { }

  user = JSON.parse(localStorage.getItem("user") as any)
  userId = this.user.uid

  ngOnInit(): void {

  }
}