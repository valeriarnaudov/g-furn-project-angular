import { CollectionService } from 'src/app/shared/services/collection.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import IPost from 'src/app/shared/interfaces/post.interface';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css'],
})
export class MyPostsComponent implements OnInit {
  userId!: string;
  userPosts!: IPost[];

  constructor(
    private collectionService: CollectionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    if (!localStorage.getItem('user')) {
      return this.router.navigate(['/auth/login']);
    }
    const routeId = this.activatedRoute.snapshot.params?.['id'];

    if (routeId) {
      this.collectionService.getPosts().subscribe((posts) => {
        this.userPosts = posts.filter(
          (userPost) => userPost.creator.uid === routeId
        );
      });
    } else {
      this.userId = JSON.parse(localStorage.getItem('user') as any).uid;

      this.collectionService.getPosts().subscribe((posts) => {
        this.userPosts = posts.filter(
          (userPost) => userPost.creator.uid === this.userId
        );
      });
    }
  }
}
