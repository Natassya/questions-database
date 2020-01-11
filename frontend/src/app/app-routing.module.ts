import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionsComponent } from './questions/questions.component';
import { QuestionEditComponent } from './questions/question-edit/question-edit.component';
import { TagsComponent } from './questions/tags/tags.component';
import { TagEditComponent } from './questions/tags/tag-edit/tag-edit.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/questions', pathMatch: 'full' },
  { path: 'questions', component: QuestionsComponent, children: [
    // { path: '', component: QuestionsComponent },
    // { path: 'new', component: QuestionEditComponent },
    // { path: ':id', component: RecipeDetailComponent },
    // { path: ':id/edit', component: RecipeEditComponent },
  ] },
  { path: 'questions/new', component: QuestionEditComponent },
  { path: 'tags', component: TagsComponent },
  { path: 'tags/new', component: TagEditComponent },
  { path: 'tags/:id', component: TagEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
