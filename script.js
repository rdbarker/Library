let myLibrary = [];
tableOrder =["title","author","date","pages","hasRead"]; //order in table
libraryTable = document.querySelector(".library tbody");

function Book(title,author,date,pages,hasRead){
    this.author = author;
    this.title = title;
    this.date = date;
    this.pages = pages;
    this.hasRead = hasRead;
    this.drawRow(); 
}

Book.prototype.changeReadStatus = function(){
    this.hasRead = !this.hasRead;
}

Book.prototype.drawRow = function(){
    this.row = libraryTable.insertRow(-1);
    tableOrder.forEach(key=>{
        const cell = this.row.insertCell(-1);
        const text = document.createTextNode(this[key]);
        cell.appendChild(text);
    })
}

Book.prototype.sortSelf = function(){
    libraryTable.appendChild(this.row);
}



let bookOne = new Book("Title1","ath1","1967",246,false);
let bookTwo = new Book("Title2","ath2","1984",269,true);
let bookThree = new Book("Title3","ath3","1996",960,true);

myLibrary= [bookOne,bookTwo,bookThree];

//drawLibrary(myLibrary);