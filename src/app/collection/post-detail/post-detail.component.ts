import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import IPost from 'src/app/shared/interfaces/post.interface';
import { CollectionService } from 'src/app/shared/services/collection.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  post!: any;
  currentUserId!: string;
  postId!: string;

  isOwner: boolean = false;

  constructor(
    private collectionService: CollectionService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentUserId = JSON.parse(localStorage.getItem('user') as any).uid;
    this.postId = this.activatedRoute.snapshot.params?.['id'];

    this.collectionService
      .getSinglePost(this.postId)
      .then((res) => {
        const data = res.data();
        if (this.currentUserId === data?.['creator'].uid) {
          this.isOwner = true;
        }
        this.post = data;
      })
      .catch((err) => console.log(err));
  }

  async deletePost() {
    await this.collectionService.deletePost(this.postId);
    return this.route.navigate(['/collection']);
  }
}
