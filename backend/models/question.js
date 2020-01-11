// import { Subquestion } from './subquestion.model';
// import { Alternative } from './alternative.model';
// import { Statement } from './statement.model';
// import { Tag } from './tags/tag.model'
//
// export class Question {
//   public type: string;
//   public description: string;
//   public answer: string;
//   public hasImage: boolean;
//   public imagePath: string;
//   public descriptionAfterImage: string;
//   public subquestions: Subquestion[];
//   public alternatives: Alternative[];
//   public statements: Statement[];
//   public statementsConnection: Statement[];
//   public tags: Tag[];
//
//   constructor(type: string, description: string, answer: string, hasImage: boolean = false, imagePath: string = '', descriptionAfterImage: string = '', subquestions: Subquestion[] = [], alternatives: Alternative[] = [], statements: Statement[] = [], statementsConnection: Statement[] = [], tags: Tag[] = []) {
//     this.type = type;
//     this.description = description;
//     this.answer = answer;
//     this.hasImage = hasImage;
//     this.imagePath = imagePath;
//     this.descriptionAfterImage = descriptionAfterImage;
//     this.subquestions = subquestions;
//     this.alternatives = alternatives;
//     this.statements = statements;
//     this.statementsConnection = statementsConnection;
//     this.tags = tags;
//   }
// }

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var QuestionSchema = new Schema(
  {
    type: {type: String, required: true,
           enum: ['Subjetiva simples', 'Subjetiva com subquestões', 'Subjetiva com resolução e resposta ao fim', 'Objetiva simples', 'Objetiva com afirmações enumeradas', 'Objetiva com verdadeiro e falso', 'Objetiva com ligações']},
    description: {type: String, required: true},
    answer: {type: String, required: true},
    hasImage: {type: Boolean, required: true},
    answer: {type: String, required: true},
    image: {type: Buffer},
    descriptionAfterImage: {type: String},
    subquestions: [{type: String}],
    alternatives: [{type: String}],
    statements: [{type: String}],
    statementsConnection: [{type: String}],
    tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
  }
);

//Export model
module.exports = mongoose.model('Question', QuestionSchema);
