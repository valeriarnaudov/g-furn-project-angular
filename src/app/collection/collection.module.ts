import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { CollectionRoutingModule } from './collection-routing.module';

@NgModule({
  declarations: [
    MainComponent,
    NewPostComponent,
    PostDetailComponent,
    EditPostComponent,
    MyPostsComponent,
  ],
  imports: [CommonModule, CollectionRoutingModule],
  exports: [
    MainComponent,
    NewPostComponent,
    PostDetailComponent,
    MyPostsComponent,
    EditPostComponent,
  ],
})
export class CollectionModule {}
