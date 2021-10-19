let books = [
 { 
    ISBN : "12345Book" ,
    title : "The power of subconsious mind" ,
    pubDate : "2021-04-10" ,
    language : "eng" ,
    numPage : 200 ,
    authors : [1,2] ,
    publications : [1,2] ,
    category : ["consious mind" , "subconsious mind" , "self-help books"]
 },
 { 
  ISBN : "12345None" ,
  title : "Thinking big" ,
  pubDate : "2021-04-10" ,
  language : "eng" ,
  numPage : 200 ,
  authors : [1,2] ,
  publications : [1,2] ,
  category : ["consious mind" , "subconsious mind" , "self-help books"]
},
];

let authors = [
    {
     id : 1 ,
     name : "Joseph Murphy" ,
     books : ["12345Book" , "Rich Dad Poor Dad"] ,
    },

    {
      id : 2 ,
      name : "Brijesh" ,
      books : ["12345None"] ,
    },
];

let publications = [
    {
    
    } ,
    {
      id :2 ,
      name : "Books corner" , 
      books : [] ,
     } , 
];

module.exports = {books , authors , publications} ;