import { Component } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    private postService: PostService
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

  posts!: Post[]
}
