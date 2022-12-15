import { Component, OnInit } from '@angular/core';
import IPost from 'src/app/shared/interfaces/post.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CollectionService } from 'src/app/shared/services/collection.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  posts!: IPost[] | any;
  userData!: string[];

  constructor(private collectionService: CollectionService) {}

  ngOnInit(): void {
    this.collectionService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }
}
