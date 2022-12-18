import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { CollectionService } from 'src/app/shared/services/collection.service';
import { emptyValidator } from 'src/app/shared/validators/empty-validator';
import { categories } from 'src/app/shared/constants/category-options';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  form: FormGroup;
  uploadedImg!: string;
  errorUploading = false;

  selectOptions: any;

  postData!: any;
  currentUserId!: string;
  editPostId!: string;

  constructor(
    private storage: Storage,
    private router: Router,
    private collectionService: CollectionService,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = new FormGroup({
      img: new FormControl(''),
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
    this.selectOptions = categories;
  }

  ngOnInit(): void {
    this.currentUserId = JSON.parse(localStorage.getItem('user') as any)?.uid;
    this.editPostId = this.activatedRoute.snapshot.params?.['id'];
    this.collectionService
      .getSinglePost(this.editPostId)
      .then((res) => {
        const data = res.data();
        if (data?.['creator']?.uid === this.currentUserId) {
          this.postData = res.data();
        } else {
          this.router.navigate(['/collection']);
        }
      })
      .catch((err) => console.log(err));
  }

  editFormHandler() {
    if (window.confirm('Do you want to save the changes?')) {
      const value = this.form.value;
      if (
        value.title !== '' &&
        value.title !== null &&
        value.title !== undefined
      ) {
        this.postData.title = value.title;
      }
      if (
        value.category !== '' &&
        value.category !== null &&
        value.category !== undefined
      ) {
        this.postData.category = value.category;
      }
      if (value.img !== '' && value.img !== null && value.img !== undefined) {
        this.postData.img = this.uploadedImg;
      }
      if (
        value.description !== '' &&
        value.description !== null &&
        value.description !== undefined
      ) {
        this.postData.description = value.description;
      }

      this.collectionService
        .editPost(this.editPostId, this.postData)
        .then((res) =>
          this.router.navigate(['/collection/details/' + this.editPostId])
        )
        .catch((err) => console.log(err));
    }
  }

  uploadImg($event: any) {
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
