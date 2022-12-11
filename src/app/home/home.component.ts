import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private postService: PostService) { }

  posts!: Post[]

  ngOnInit(): void {
    this.postService.readAllPosts().subscribe(res => {
      this.posts = res.map(p => {
        return {
          id: p.payload.doc.id,
          ...p.payload.doc.data() as {}
        } as Post
      })
    })
  }
}
