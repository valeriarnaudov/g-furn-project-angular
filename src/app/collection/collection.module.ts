import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';



@NgModule({
  declarations: [
    MainComponent,
    NewPostComponent,
    PostDetailComponent
  ],
  imports: [
    CommonModule
  ], exports: [
    MainComponent,
    NewPostComponent,
    PostDetailComponent
  ]
})
export class CollectionModule { }
