import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ServicesComponent } from './pages/services/services.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CompilersComponent } from './pages/compilers/compilers.component';
import { ChatComponent } from './pages/chat/chat.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'about', component: AboutUsComponent },
      { path: 'compilers', component: CompilersComponent },
      { path: 'mentor-chat', component: ChatComponent }
    ]
  }
];
