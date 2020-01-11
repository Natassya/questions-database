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
    let statements: FormArray = new FormArray([]);
    let statementsConnection: FormArray = new FormArray([]);
    let alternatives: FormArray = new FormArray([]);
    let tags: FormArray = new FormArray([]);

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
      if (question['statements']) {
        for (let statement of question.statements) {
          statements.push(
            new FormGroup({
              'statementDescription': new FormControl(statement.description, Validators.required)
            })
          );
        }
      }
      if (question['statementsConnection']) {
        for (let statementConnection of question.statementsConnection) {
          statementsConnection.push(
            new FormGroup({
              'statementConnectionDescription': new FormControl(statementConnection.description, Validators.required)
            })
          );
        }
      }
      if (question['alternatives']) {
        for (let alternative of question.alternatives) {
          alternatives.push(
            new FormGroup({
              'alternativeDescription': new FormControl(alternative.description, Validators.required)
            })
          );
        }
      }
      if (question['tags']) {
        for (let tag of question.tags) {
          tags.push(
            new FormGroup({
              'tagType': new FormControl(tag.type, Validators.required),
              'tagDescription': new FormControl(tag.description, Validators.required)
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
      'subquestions': questionSubs,
      'statements': statements,
      'alternatives': alternatives,
      'statementsConnection': statementsConnection,
      'tagsQuestion': tags
    });

  }

  onSubmit() {
    // console.log(this.form.get('tagsQuestion').controls);
    // const newQuestion = new Question(this.form.value)
    if (this.editMode) {
      this.questionService.updateQuestion(this.form.value, this.index);
    } else {
      this.questionService.addQuestion(this.form.value);
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

  onAddStatement() {
    (<FormArray>this.form.get('statements')).push(
      new FormGroup({
        'statementDescription': new FormControl('', Validators.required)
      })
    );
  }

  onDeleteStatement(index: number) {
    (<FormArray>this.form.get('statements')).removeAt(index);
  }

  onAddStatementConnection() {
    (<FormArray>this.form.get('statementsConnection')).push(
      new FormGroup({
        'statementConnectionDescription': new FormControl('', Validators.required)
      })
    );
  }

  onDeleteStatementConnection(index: number) {
    (<FormArray>this.form.get('statementsConnection')).removeAt(index);
  }

  onAddAlternative() {
    (<FormArray>this.form.get('alternatives')).push(
      new FormGroup({
        'alternativeDescription': new FormControl('', Validators.required)
      })
    );
  }

  onDeleteAlternative(index: number) {
    (<FormArray>this.form.get('alternatives')).removeAt(index);
  }

  onAddTag() {
    (<FormArray>this.form.get('tagsQuestion')).push(
      new FormGroup({
        'tagType': new FormControl('Disciplina', Validators.required),
        'tagDescription': new FormControl('', Validators.required)
      })
    );
  }

  onDeleteTag(index: number) {
    (<FormArray>this.form.get('tagsQuestion')).removeAt(index);
  }


}
