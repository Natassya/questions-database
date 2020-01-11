import { Injectable } from '@angular/core';
import { Question } from './question.model';
import { Subquestion } from './subquestion.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  questions: Array<Question> = [new Question('Subjetiva simples', 'Exemplo de questao subjetiva.', 'Exemplo correto'),
                    new Question('Subjetiva com subquestões', 'Exemplo de questao subjetiva com subquestões.', 'Exemplo correto', false, '', '', [new Subquestion('Opcao a'), new Subquestion('Opcao b')])];

  constructor() { }

  fetchQuestions() {
    return this.questions.slice();
  }

  getQuestion(index: number) {
    return this.questions[index];
  }

  addQuestion(question: Question) {
    this.questions.push(question);
  }

  updateQuestion(question: Question, index: number) {
    this.questions[index] = question;
  }

  deleteQuestion(index: number) {
    this.questions.splice(index, 1);
  }

}
