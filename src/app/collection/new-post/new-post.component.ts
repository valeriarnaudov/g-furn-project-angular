import { CollectionService } from './../../services/collection.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent {
  postForm: FormGroup;

  constructor(private collectionService: CollectionService) {
    this.postForm = new FormGroup({
      img: new FormControl(),
      title: new FormControl(),
      description: new FormControl(),
      category: new FormControl(),
    });
  }

  async newPostHandler() {
    await this.collectionService.addPost(this.postForm.value);
  }
}
