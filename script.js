let myLibrary = [];

function Book(title,author,date,pages,hasRead){
    this.author = author;
    this.title = title;
    this.date = date;
    this.pages = pages;
    this.hasRead = hasRead;
}

Book.prototype.changeReadStatus = function(){
    this.hasRead = !this.hasRead;
}

let bookOne = Object.create("Title1","ath1","1967",246,false);
let bookTwo = Object.create("Title2","ath2","1984",269,true);
let bookThree = Object.create("Title3","ath3","1996",960,true);