const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name:{type:String, required:true},
    author:{type:String, required:true},
    category:{type:String, required:true}
},{
    timeStamps:true
}
);

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;