const router = require('express').Router();
const Book = require('../models/book.model');

router.route('/').get((req, res)=>{
    Book.find()
    .then(books=>res.json(books))
    .catch(err =>res.status(400).json('Error: '+err));
})
router.route('/add').post((req, res)=>{
    const bookName = req.body.name;
    const bookAuthor =req.body.author;
    const bookCategory = req.body.category;
    
    const newBook = new Book({
        name:bookName,
        author:bookAuthor,
        category:bookCategory
    })
    newBook.save()
    .then(()=>res.status(200).json('Book Added!'))
    .catch(err=> res.status(400).json('Error: '+err));
})

router.route('/:id').get((req,res)=>{
    Book.findById((req.params.id))
    .then(book => res.json(book))
    .catch(err => res.status(400).json('Error: '+err))
})

router.route('/:id').get((req,res)=>{
    Book.findByIdAndDelete(req.params.id)
    .then(()=> res.json('Book deleted'))
    .then(err=> res.json('Error: '+err))
})

router.route('/update/:id').post((req,res)=>{
    Book.findById(req.params.id)
    .then(book=>{
        book.name=req.body.name;
        book.author=req.body.author;
        book.category=req.body.category;

        book.save()
        .then(()=> res.json('Book updated'))
        .catch(err =>res.status(400).json('Error: '+err))
    })
})

router.route('/count').post((req,res)=>{
    const category = req.body.category;
    const count=Book.find({
        category:category
    }).count()
    .then(result=> res.json(result))

});

router.route('/getByCategory').post((req,res)=>{
    const category = req.body.category;
    const count=Book.find({
        category:category
    })
    .then(results=> res.json(results))

});

router.route('/countAll').get((req,res)=>{
    const category = req.body.category;
    const count=Book.find(
    ).countDocuments()
    .then(result=> res.json(result))

});
module.exports = router;