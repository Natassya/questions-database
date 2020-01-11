import { Subquestion } from './subquestion.model';
import { Alternative } from './alternative.model';
import { Statement } from './statement.model';
import { Tag } from './tags/tag.model'

export class Question {
  public type: string;
  public description: string;
  public answer: string;
  public hasImage: boolean;
  public imagePath: string;
  public descriptionAfterImage: string;
  public subquestions: Subquestion[];
  public alternatives: Alternative[];
  public statements: Statement[];
  public statementsConnection: Statement[];
  public tags: Tag[];

  constructor(type: string, description: string, answer: string, hasImage: boolean = false, imagePath: string = '', descriptionAfterImage: string = '', subquestions: Subquestion[] = [], alternatives: Alternative[] = [], statements: Statement[] = [], statementsConnection: Statement[] = [], tags: Tag[] = []) {
    this.type = type;
    this.description = description;
    this.answer = answer;
    this.hasImage = hasImage;
    this.imagePath = imagePath;
    this.descriptionAfterImage = descriptionAfterImage;
    this.subquestions = subquestions;
    this.alternatives = alternatives;
    this.statements = statements;
    this.statementsConnection = statementsConnection;
    this.tags = tags;
  }
}
