import { CollectionService } from '../../shared/services/collection.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  Storage,
} from '@angular/fire/storage';
import { emptyValidator } from 'src/app/shared/validators/empty-validator';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

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

  user = JSON.parse(localStorage.getItem('user') as any);

  constructor(
    private collectionService: CollectionService,
    private storage: Storage,
    private router: Router,
    private authService: AuthService
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
    const postCreator = await this.authService.getUserData(this.user.uid);
    const req = {
      ...this.form.value,
      img: this.uploadedImg,
      creator: {...postCreator, uid: this.user.uid},
    };
    await this.collectionService.addPost(req);
    return this.router.navigate(['/collection']);
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
