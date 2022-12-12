import { EditPostComponent } from './edit-post/edit-post.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { NewPostComponent } from './new-post/new-post.component';
import { MainComponent } from './main/main.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'create',
    component: NewPostComponent,
    data: { title: 'Create post' },
  },
  {
    path: 'detail/:id',
    component: PostDetailComponent,
    data: { title: 'Details' },
  },
  {
    path: 'my-posts',
    component: MyPostsComponent,
    data: { title: 'My posts' },
  },
  {
    path: 'edit/:id',
    component: EditPostComponent,
    data: { title: 'Edit post' },
  },
];

export const CollectionRoutingModule = RouterModule.forChild(routes);
