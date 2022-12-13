import { CollectionService } from './../../services/collection.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  Storage,
} from '@angular/fire/storage';
import { emptyValidator } from 'src/app/shared/validators/empty-validator';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent {
  form: FormGroup;
  uploadedImg!: string;
  errorUploading = false;
  emptyCategory = false;

  constructor(
    private collectionService: CollectionService,
    private storage: Storage
  ) {
    this.form = new FormGroup({
      img: new FormControl('', [Validators.required]),
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(20),
      ]),
      category: new FormControl('', [Validators.required, emptyValidator()]),
    });
  }

  async newPostHandler() {
    if (this.form.value.category === '') {
      return (this.emptyCategory = true);
    }
    const req = { ...this.form.value, img: this.uploadedImg };
    return await this.collectionService.addPost(req);
  }

  uploadPostImg($event: any) {
    const file = $event.target.files[0];
    const imgRef = ref(this.storage, `images/${file.name}`);

    uploadBytes(imgRef, file)
      .then(async (res) => {
        const link = await getDownloadURL(res.ref);
        this.uploadedImg = link;
        this.errorUploading = false;
      })
      .catch((err) => {
        return (this.errorUploading = true);
      });
  }
}
