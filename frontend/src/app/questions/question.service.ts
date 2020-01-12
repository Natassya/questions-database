import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Question } from './question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  questionFetchURL = 'http://localhost:3000/question/';
  questionGetURL = 'http://localhost:3000/question/id';

  constructor(private http: HttpClient) { }

  fetchQuestions(): Observable<Question[]> {
    return this.http
      .get<Question[]>(this.questionFetchURL);
  }

  getQuestion(id: string): Observable<Question> {
    return this.http
      .post<Question>(this.questionGetURL, {_id: id});
  }

  addQuestion(question: Question): Observable<Question> {
    delete question._id;
    console.log(question);
    return this.http
      .put<Question>(this.questionGetURL, question);
  }

  updateQuestion(question: Question, id: string) {
    question._id = id;
    return this.http
      .put<Question>(this.questionGetURL, question);
  }

  deleteQuestion(id: string): Observable<Question> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {_id: id}
    };
    return this.http
      .delete<Question>(this.questionGetURL, httpOptions);
  }

}
