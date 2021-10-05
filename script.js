let myLibrary = [];
const tableOrder =["title","author","date","pages","hasRead"]; //order in table
const libraryTable = document.querySelector(".library tbody");
const form = document.querySelector("#book-input");
const formInputs = form.querySelectorAll("input");
const addBookButton = document.querySelector("#add-book");
const clearBookForm = document.querySelector("#clear-form");

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
Book.prototype.sort = function(){
    libraryTable.appendChild(this.row);
}
Book.prototype.delete = function(library){
    libraryTable.deleteRow(this.row.rowIndex-1);
    return library.filter(obj => obj!==this);
}
function clearForm(event){
    formInputs.forEach(input => input.value= "");
    event.preventDefault();
}
function addBook(event){
    let readStatus = false;
    if (formInputs[4].value==='on') readStatus = true;
    myLibrary.push(new Book(formInputs[0].value,formInputs[1].value,formInputs[2].value,
        formInputs[3].value,readStatus));
    formInputs.forEach(input => input.value= "");
    event.preventDefault();
}

let bookOne = new Book("Title1","ath1","1967",246,false);
let bookTwo = new Book("Title2","ath2","1984",269,true);
let bookThree = new Book("Title3","ath3","1996",960,true);

form.addEventListener("submit",addBook,false);
form.addEventListener("reset",clearForm,false);

myLibrary= [bookOne,bookTwo,bookThree];

