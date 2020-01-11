// export class Tag {
//   // Type can be "Disciplina" or "Conteúdo"
//   constructor(public type: string, public description:string) {}
//
// }
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TagSchema = new Schema(
  {
    type: {type: String, required: true, enum: ['Disciplina', 'Conteúdo']},
    description: {type: String, required: true, max: 200},
  }
);

//Export model
module.exports = mongoose.model('Tag', TagSchema);
