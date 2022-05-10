let myLibrary = []

function Book(title, author, numPages, isRead = false) {
  this.title = title
  this.author = author
  this.numPages = numPages
  this.isRead = isRead
}

function addTolibrary() { 
  myLibrary.push(new Book())
}