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

let bookOne = new Book("Title1","ath1","1967",246,false);
let bookTwo = new Book("Title2","ath2","1984",269,true);
let bookThree = new Book("Title3","ath3","1996",960,true);