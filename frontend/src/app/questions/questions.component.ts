import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Question } from './question.model';
import { Subquestion } from './subquestion.model';
import { QuestionService } from './question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  private questions: Question[] = [];
  filteredQuestions: Array<Question> = [];
  _inputBusca: string;

  constructor(private questionService: QuestionService,
              private router: Router,
              private route: ActivatedRoute) {  }

  ngOnInit() {
    this.questionService.fetchQuestions().subscribe(questions => {
        this.questions = questions;
        this.filteredQuestions = this.questions;
      });
  }

  getQuestions() {
    return this.questions.slice();
  }

  addQuestion() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  editQuestion(question: Question) {
    this.router.navigate(['./', question._id], {relativeTo: this.route});
  }

  deleteQuestion(question: Question) {
    this.questionService.deleteQuestion(question._id).subscribe(question => {
      this.questionService.fetchQuestions().subscribe(questions => {
          this.questions = questions;
          this.filteredQuestions = this.questions;
        });
    });
  }


  get inputBusca(): string {
    return this._inputBusca;
  }

  set inputBusca(value: string) {
    this._inputBusca = value;
    this.filteredQuestions = this.inputBusca ? this.performFilter(this.inputBusca) : this.questions;
  }

  performFilter(filterBy: string): Question[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.questions.filter((question: Question) =>
      question.description.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
      question.type.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  onBuscar() {
    this.performFilter(this.inputBusca);
  }
}
