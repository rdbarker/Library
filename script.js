let myLibrary = [];
const tableOrder =["title","author","date","pages","hasRead"]; //order in table
const libraryTable = document.querySelector(".library tbody");
const form = document.querySelector("#book-input");
const formInputs = form.querySelectorAll("input");
const addBookButton = document.querySelector("#add-book");
const clearBookForm = document.querySelector("#clear-form");
const sortButtons = document.querySelectorAll("th> span")

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
        if (key!=="hasRead"){
            const text = document.createTextNode(this[key]);
            cell.appendChild(text);
        }
        else{
            this.readButton = document.createElement("button");
            this.readButtonIcon = document.createElement("span");
            if (this.hasRead===true) this.readButtonIcon.classList.add("icon-tick");
            else this.readButtonIcon.classList.add("icon-times");
            this.readButton.appendChild(this.readButtonIcon);
            cell.appendChild(this.readButton);
            this.readButton.addEventListener("click",this,false);
        }
    })
    const cell = this.row.insertCell(-1);
    this.deleteButton = document.createElement("button");
    this.deleteButton.classList.add("button-delete");
    const span = document.createElement("span");
    span.classList.add("icon-times");
    this.deleteButton.appendChild(span);
    cell.appendChild(this.deleteButton);
    this.deleteButton.addEventListener("click",this,false);
}
Book.prototype.sort = function(){
    libraryTable.appendChild(this.row);
}
Book.prototype.handleEvent = function(event){
    console.log(event.target.classList)
    //delete book
    if (event.target.classList.value==="button-delete"){
        this.deleteButton.removeEventListener("click",this);
        libraryTable.deleteRow(this.row.rowIndex-1);
        myLibrary = myLibrary.filter(obj => obj!==this);
    }
    else{
        this.changeReadStatus();
        if (this.hasRead===true) this.readButtonIcon.classList="icon-tick";
        else this.readButtonIcon.classList = "icon-times";
    }
    
}
function clearForm(event){
    formInputs.forEach(input => {
        if(input.type==="checkbox") input.checked = false;
        else input.value= "";
    })
    event.preventDefault();
}
function addBook(event){
    myLibrary.push(new Book(formInputs[0].value,formInputs[1].value,formInputs[2].value,
        formInputs[3].value,formInputs[4].checked));
    formInputs.forEach(input => input.value= "");
    event.preventDefault();
}
function sortLibrary(key,reverse=false){
    if (key==="hasRead"){
        myLibrary.sort((a,b) => {
            if (a[key]>b[key]) return -1;
            else if (a[key]<b[key]) return 1;
            else return 0;
        })
    }
    else{
        myLibrary.sort((a,b) => {
            if (a[key]<b[key]) return -1;
            else if (a[key]>b[key]) return 1;
            else return 0;
        })
    }
    if (reverse===true) myLibrary = myLibrary.reverse();
    myLibrary.forEach(book => book.sort());
}
function resetSortButtons(){
    sortButtons.forEach(button=>{
        button.dataset.state = "unsorted";
        button.classList = "icon-arrow-unsorted icon";
    })
}
function clickSortButton(event){
    const sortKey = event.target.dataset.sort;
    const state = event.target.dataset.state;
    resetSortButtons();
    if (state==="unsorted" || state==="down"){
        event.target.dataset.state = "up";
        event.target.classList = "icon-arrow-sorted-up icon";
        sortLibrary(sortKey);
    }
    else if (state==="up"){
        event.target.dataset.state = "down";
        event.target.classList = "icon-arrow-sorted-down icon";
        sortLibrary(sortKey,true);
    }
}

let bookOne = new Book("TitlePPP","bbb","1967",246,false);
let bookTwo = new Book("TitleAAA","ath2","1984",269,true);
let bookThree = new Book("TitleHHH","ath3","1996",960,true);

form.addEventListener("submit",addBook,false);
form.addEventListener("reset",clearForm,false);
sortButtons.forEach(button =>{
    button.addEventListener("click",clickSortButton);
})

myLibrary= [bookOne,bookTwo,bookThree];

