import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { Question } from '../question.model';
import { Subquestion } from '../subquestion.model';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {
  form: FormGroup;
  index: number;
  editMode = false;
  question: Question;

  constructor(private questionService: QuestionService,
              private router: Router,
              private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.index = params['index'];
          this.editMode = params['index'] != null;
          if (this.editMode) {
            this.question = this.questionService.getQuestion(this.index);
          }
          this.initForm();
        }
      );
  }

  private initForm() {
    let type = 'Subjetiva simples';
    let description = '';
    let answer = '';
    let hasImage = false;
    let descriptionAfterImage = '';
    let questionSubs: FormArray = new FormArray([]);

    if (this.editMode) {
      const question = this.questionService.getQuestion(this.index);
      type = question.type;
      description = question.description;
      answer = question.answer;
      hasImage = question.hasImage;
      descriptionAfterImage = question.descriptionAfterImage;
      if (question['subquestions']) {
        for (let subquestion of question.subquestions) {
          questionSubs.push(
            new FormGroup({
              'subquestionDescription': new FormControl(subquestion.description, Validators.required)
            })
          );
        }
      }
    }

    this.form = new FormGroup({
      'type': new FormControl(type, Validators.required),
      'description': new FormControl(description, Validators.required),
      'answer': new FormControl(answer, Validators.required),
      'hasImage' : new FormControl(false, Validators.required),
      'imagePath': new FormControl(''),
      'descriptionAfterImage': new FormControl(''),
      'subquestions': questionSubs
    });

    //   if (recipe['ingredients']) {
    //     for (let ingredient of recipe.ingredients) {
    //       recipeIngredients.push(
    //         new FormGroup({
    //           'name': new FormControl(ingredient.name, Validators.required),
    //           'amount': new FormControl(ingredient.amount, [
    //             Validators.required,
    //             Validators.pattern(/^[1-9]+[0-9]*$/)
    //           ])
    //         })
    //       );
    //     }
    //   }
    // }
    //
    // this.recipeForm = new FormGroup({
    //   'name': new FormControl(recipeName, Validators.required),
    //   'imagePath': new FormControl(recipeImagePath, Validators.required),
    //   'description': new FormControl(recipeDescription, Validators.required),
    //   'ingredients': recipeIngredients
    // });
  }

  get sigla() {
    return this.form.get('sigla');
  }

  get nome() {
    return this.form.get('nome');
  }

  onSubmit() {
    console.log(this.form.value);
    const newQuestion = new Question(this.form.value.sigla, this.form.value.nome);
    if (this.editMode) {
      this.questionService.updateQuestion(newQuestion, this.index);
    } else {
      this.questionService.addQuestion(newQuestion);
    }
    this.router.navigate(['Question']);
  }

  onDelete() {
    this.questionService.deleteQuestion(this.index);
    this.router.navigate(['Question']);
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }

  onAddSubquestion() {
    (<FormArray>this.form.get('subquestions')).push(
      new FormGroup({
        'subquestionDescription': new FormControl('', Validators.required)
      })
    );
  }

  onDeleteSubquestion(index: number) {
    (<FormArray>this.form.get('subquestions')).removeAt(index);
  }

}
