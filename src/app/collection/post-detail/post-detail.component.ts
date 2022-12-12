import { Router } from '@angular/router';
import { Component } from '@angular/core';
import IPost from 'src/app/interfaces/post.interface';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent {

  post!: IPost

  constructor(
    private collectionService: CollectionService,
    private route: Router
  ) {}

  async deletePost(post: IPost) {
    await this.collectionService.deletePost(post);
    return this.route.navigate(['/collection/main']);
  }
}
