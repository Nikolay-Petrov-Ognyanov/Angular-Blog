import { Component } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(
    public postService: PostService
  ) {
    this.postService.readAllPosts().subscribe(res => {
      this.posts = res.map(p => {
        return {
          id: p.payload.doc.id,
          ...p.payload.doc.data() as {}
        } as Post
      })
    })
  }

  user = JSON.parse(localStorage.getItem("user") as any).email
  posts!: Post[]
}