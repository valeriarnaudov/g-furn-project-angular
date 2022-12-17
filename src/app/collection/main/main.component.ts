import { categories } from './../../shared/constants/category-options';
import { FormGroup, FormControl } from '@angular/forms';
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

  selectOptions: any;

  searchForm: FormGroup;
  categoryForm: FormGroup;

  filteredData!: any;

  constructor(private collectionService: CollectionService) {
    this.searchForm = new FormGroup({
      search: new FormControl(),
    });

    this.categoryForm = new FormGroup({
      category: new FormControl(),
    });
    this.selectOptions = categories;
  }

  ngOnInit(): void {
    this.collectionService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  searchHandler() {
    const search = this.searchForm.value.search;
    this.filteredData = this.posts.filter((post: any) =>
      post.title.includes(search)
    );
    this.searchForm.reset();
  }

  categoryHandler() {
    const category = this.categoryForm.value.category;
    this.filteredData = this.posts.filter(
      (post: any) => post.category === category
    );
  }

  clearFilter() {
    this.filteredData = '';
    this.searchForm.reset();
    this.categoryForm.reset();
  }
}
