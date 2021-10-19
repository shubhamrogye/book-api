require("dotenv").config();
//frame work
const express = require("express");
const mongoose = require("mongoose");


// Database 
const database = require("./database/database");

//models
const BookModels = require("./database/book");
const AuthorModels = require("./database/author");
const PublicatinModels = require("./database/publication");


//initialization
const booky = express();

//configuration 
booky.use(express.json());

//establish a connectrion with database (mongodb)
mongoose.connect( process.env.MONGO_URL , 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
      
}).then(() => console.log("connection established !!!!! :> "));

/*       (these are comments to describe an API created below) (This Apis are of books section in database,js )
Route          /
Description    to get all books     
Access         public(as we have not provided any password or something)
Parameter      none
Methods        get 
*/ 
booky.get("/" , (req , res) => {
  return res.json({ books : database.books });
});
/*  (these are comments to describe an API created below)  (This Apis are of books section in database,js )

Route          /
Description    to get specific book based on ISBN    
Access         public(as we have not provided any password or something)
Parameter      isbn
Methods        get 
*/ 
booky.get("/is/:isbn" , (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
    );

    if (getSpecificBook.length === 0) {
    return res.json({
        error : `no book found for the ISBN of ${req.params.isbn}`,
    });
  } 
  return res.json({ book : getSpecificBook});
});
/*  (these are comments to describe an API created below) (This Apis are of books section in database,js )
Route          /c (here /c is route because we are accessing a book through category)
Description    to get specific book based on category     
Access         public(as we have not provided any password or something)
Parameter      category
Methods        get 
*/ 
booky.get("/c/:category" , (req ,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.category.includes(req.params.category)
    );
    if(getSpecificBook.length === 0) {
        return res.json({
            error : `No book found for the category of ${req.params.category}`,
        });
    }
    return res.json({book : getSpecificBook});
});
/*  (these are comments to describe an API created below) (This Apis are of books section in database,js )
Route          /l
Description    to get specific book based on language   
Access         public(as we have not provided any password or something)
Parameter      language
Methods        get 
*/ 
booky.get("/l/:language" , (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.language.includes(req.params.language)
    );
    if(getSpecificBook.length === 0)
    return res.json({
        error : `no book found for this language ${req.params.language}`,
    });
    return res.json({book : getSpecificBook});
});







/*  (these are comments to describe an API created below) (This Apis are of authors section in database,js )
Route          /author
Description    to get all authors    
Access         public(as we have not provided any password or something)
Parameter      none
Methods        get 
*/ 
booky.get("/authors" , (req, res) => {
    return res.json({ authors : database.authors});
});
/*  (these are comments to describe an API created below)  (This Apis are of authors section in database,js )
Route          /i 
Description    to get specific author based on id   
Access         public(as we have not provided any password or something)
Parameter      id
Methods        get 
*/ 
booky.get("/i/:id" , (req, res) => {
    const getSpecificAuthor = database.authors.filter(
     (author) => (author.id === (parseInt(req.params.id)))
    );
    if(getSpecificAuthor.length === 0)
    return res.json({
        error : `No author found for this id ${req.params.id}` ,
      });
      return res.json({authors : getSpecificAuthor});
    });
   /*  (these are comments to describe an API created below)  (This Apis are of authors section in database,js )
Route          /author/book
Description    to get specific author based on books   
Access         public(as we have not provided any password or something)
Parameter      isbn
Methods        get 
*/ 
booky.get("/authors/books/:isbn" , (req , res) => {
const getSpecificAuthor = database.authors.filter(
    (author) => author.books.includes(req.params.isbn)
);
if(getSpecificAuthor.length === 0)
return res.json({
    error : ` no author found for this book ${req.params.isbn}` , 
  });
return res.json({authors : getSpecificAuthor });
});






   /*  (these are comments to describe an API created below)  (This Apis are of publications section in database,js )
Route          /publications
Description    to get all publications   
Access         public(as we have not provided any password or something)
Parameter      none
Methods        get 
*/ 
booky.get("/publications" , (req, res) => {
    return res.json({publications : database.publications});
});
  /*  (these are comments to describe an API created below)  (This Apis are of publications section in database,js )
Route          /i/:id
Description    to get all publications based on id   
Access         public(as we have not provided any password or something)
Parameter      id
Methods        get 
*/ 
booky.get("/identification/:id" , (req, res) => {
    const getSpecificPublication = database.publications.filter (
    (publication) => (publication.id === (parseInt(req.params.id)))
    );
    if(getSpecificPublication.length === 0)
    return res.json ({
        error : `no publication found for the id ${req.params.id}` ,
    });
    return res.json({publications : getSpecificPublication});
});
/*  (these are comments to describe an API created below)  (This Apis are of publications section in database,js )
Route          /n/:name
Description    to get all publications based on name   
Access         public(as we have not provided any password or something)
Parameter      name
Methods        get 
*/ 
booky.get("/n/:name" , (req, res) => {
    const getSpecificPublication = database.publications.filter (
    (publication) => publication.name.includes(req.params.name)
    );
    if(getSpecificPublication.length === 0)
    return res.json ({
        error : `no publication found for the name ${req.params.name}` ,
    });
    return res.json({publications : getSpecificPublication});
});

/*  (these are comments to describe an API created below)  (This Apis are of publications section in database,js )
Route          /publications/books
Description    to get all publications based on books   
Access         public(as we have not provided any password or something)
Parameter      isbn
Methods        get 
*/ 
booky.get("/publications/books/:isbn" , (req, res) => {
    const getSpecificPublication = database.publications.filter (
    (publication) => publication.books.includes(req.params.isbn)
    );
    if(getSpecificPublication.length === 0)
    return res.json ({
        error : `no publication found for the name ${req.params.isbn}` ,
    });
    return res.json({publications : getSpecificPublication});
});

/*
Route           /book/add
Description     add new book
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
booky.post("/book/add", (req, res) => {
    const { newBook } = req.body; // we are getting the data from the req body
    database.books.push(newBook);  // we are pushing newBook to our database 
    return res.json({ books: database.books }); // then we are returning it 
  });
   

/*
Route           /author/add
Description     add new author
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
booky.post("/author/add" , (req, res) => {
    const {newAuthor} = req.body;
    database.authors.push(newAuthor);
    return res.json({authors : database.authors});
});


/*
Route           /publication/add
Description     add new publication
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
booky.post("/publication/add" , (req, res) => {
    const {newPublication} = req.body;
    database.publications.push(newPublication);
    return res.json({publications : database.publications});
});

/*
Route           /book/add
Description     update book title 
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
booky.put("/book/update/title/:isbn" , (req,res) => {
 database.books.forEach((book) => {
     if(book.ISBN === req.params.isbn) {
         book.title = req.body.newBookTitle;
         return;
     }
 });
 return res.json({books : database.books});
});

/*q
Route           /book/add/author/:isbn/:authorId
Description     update book author 
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
booky.put("/book/update/author/:isbn/:authorId" , (req,res) => {
    //update book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            return book.authors.push(parseInt(req.params.authorId));
        };

    });
    //update author database
    database.authors.forEach((author) => {
        if(author.id === parseInt(req.params.authorId)){
            return author.books.push(req.params.isbn); 
        };
    });
    return res.json({books : database.books , authors : database.authors});
});



/*
Route           /author/update/:authorId
Description     update book author 
Access          PUBLIC
Parameter       id,name
Methods         PUT
*/
booky.put("/author/update/:authorId" , (req,res) => {
    database.authors.forEach((author) => {
        if(author.id === parseInt(req.params.authorId)){
            author.name = req.body.newAuthorName;
         return;
        }
    });
    return res.json({author : database.authors });
 });

 /*
Route           /publication/update/:publicationId
Description     update publcation name
Access          PUBLIC
Parameter       id , name
Methods         PUT
*/
booky.put("/publication/update/:publicationId" , (req,res) => {
    database.publications.forEach((publication) => {
        if(publication.id === parseInt(req.params.publicationId)){
            publication.name = req.body.newPublicationName;
         return;
        }
    });
    return res.json({publciations : database.publications });
 });

  /*
Route           /publication/update/:publicationId
Description     update/add books to the publcation 
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
booky.put("/publication/update/book/:isbn" , (req,res) => { 
    //update the publication database
    database.publications.forEach((publication) => {
        if(publication.id === req.body.pubId) {
            return publication.books.push(req.params.isbn);
        }
    });
    //update the book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn) {
            book.publication = req.body.pubId;
            return ;
        }
    });
    
return res.json({books : database.books , publications : database.publications });
});

  /*
Route           /delete/book/:isbn
Description     update/add books to the publcation 
Access          PUBLIC
Parameter       isbn
Methods         DELETE
*/
booky.delete("/delete/book/:isbn" , (req,res) => {
    const updateBookDatabase = database.books.filter(
        (book) => book.ISBN !== req.params.isbn 
        );
        database.books = updateBookDatabase;
        return res.json({books : database.books});
});

 /*
Route           /delete/book/:isbn/:authorId
Description     delete an author from a book 
Access          PUBLIC
Parameter       isbn , author id
Methods         DELETE
*/
booky.delete("/book/delete/author/:isbn/:authorId" , (req,res) => {
    //update the book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn) {
            const newAuthorList = book.authors.filter( 
        (author) => author !== parseInt(req.params.authorId)
        );
        book.authors = newAuthorList;
        return;
        }
    });

    //update the author database
    database.authors.forEach((author) => {
        if(author.id === parseInt(req.params.authorId)) {
           const newBookList = author.books.filter(
               (book) => book !== req.params.isbn
           );
           author.books = newBookList;
           return;
        }
    });
    
 return res.json({
    message : "the author was deleted sucessfully :>" , 
    books : database.books ,
    author : database.authors 
    }); 
  });

   /*
Route           /delete/author/:authorId
Description     delete an author  
Access          PUBLIC
Parameter       author id
Methods         DELETE
*/
booky.delete("/delete/author/:authorId" , (req,res) => {
    const updateAuthorDatabase = database.authors.filter(
        (author) => author.id !== parseInt(req.params.authorId) 
    );
    database.authors = updateAuthorDatabase;
    return res.json({authors : database.authors});
});


/*
Route           /delete/publications/:pubId
Description     delete a publications
Access          PUBLIC
Parameter       pubId
Methods         DELETE
*/
booky.delete("/delete/publications/:pubId" , (req,res) => {
    const updatePublicationDatabase = database.publications.filter(
        (publication) => publication.id !== parseInt(req.params.pubId)
        );
        database.publications = updatePublicationDatabase;
        return res.json({message : "Publication deleted successfully",
                         publications : database.publications
        });
});

/*
Route           /delete/publications/:isbn/:pubId
Description     delete a publications
Access          PUBLIC
Parameter       pubId
Methods         DELETE
*/
booky.delete("/book/delete/publications/:isbn/:pubId" , (req,res) => {
    //update book database 
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn) {
             const newPublicationsList = database.publications.filter(
                 (publication) => publication !== parseInt(req.params.pubId)
             );
             book.publications = newPublicationsList;
             return;
        }
    });

    //update publication database
    database.publications.forEach((publication) => {
        if(publication.id === parseInt(req.params.pubId)) {
           const newBookList = publication.books.filter(
               (book) => book !== req.params.isbn
           );
           publication.books = newBookList;
           return;
        }
    });
    
});

// to create a local host server
booky.listen(3000 , () => console.log("Hey the server is running"));  

//to set up connectivity of an app with mmongodb --------------> 
// we need someone (an agent/mediator)  who can :-
//  talk to MongoDb in whoch MongoDb understands =>   **** (* depicts language which we dont know and this language is understood by MongoDb)
//  talk to us in the way we understand => JavaScript


// mongoose 