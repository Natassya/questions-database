import { Subquestion } from './subquestion.model';
import { Alternative } from './alternative.model';
import { Statement } from './statement.model';


export class Question {
  public type: string;
  // type 0 - simple subjective
  // type 1 - subjective with subquestions
  // type 2 - simple objective
  // type 3 - objective with enumerated statements
  // type 4 - objective with true or false
  // type 5 - objective with connections
  public description: string;
  public answer: string;
  public answerObjective: char;
  public hasImage: boolean;
  public imagePath: string;
  public descriptionAfterImage: string;
  public subquestions: Subquestion[];
  public alternatives: Alternative[];
  public statements: Statement[];

  constructor(type: string, description: string, answer: string, answerObjective: char, hasImage: boolean = false, imagePath: string = '', descriptionAfterImage: string = '', subquestions: Subquestion[] = [], alternatives: Alternative[] = [], statements: Statement[] = []) {
    this.type = type;
    this.description = description;
    this.answer = answer;
    this.answerObjective = answerObjective;
    this.hasImage = hasImage;
    this.imagePath = imagePath;
    this.descriptionAfterImage = descriptionAfterImage;
    this.subquestions = subquestions;
    this.alternatives = alternatives;
    this.statements = statements;
  }
}
