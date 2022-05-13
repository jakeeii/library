const newBookBtn = document.querySelector('.newbookbtn')
const bookForm = document.querySelector('#bookform')
const closeBtn = document.querySelector('.closebtn')
const title = document.querySelector('#title')
const author = document.querySelector('#author')
const numpages = document.querySelector('#numpages')
const alreadyRead = document.querySelector('#isread')
const submitBtn = document.querySelector('.submit')
const removeBookBtn = document.querySelector('.remove')

const HP = new Book('Harry Potter: Prisoner of Azkaban', 'J.K. Rowling', 317, true)
const LOTR = new Book('Lord of the Rings', 'J.R.R. Tolkien', 347, false)

let myLibrary = [HP, LOTR]

function Book(title, author, numPages, isRead = false) {
  this.title = title
  this.author = author
  this.numPages = numPages
  this.isRead = isRead
}

Book.prototype.toggleRead = function() {
  this.isRead = !this.isRead
}

function addTolibrary(book) { 
  myLibrary.push(book)
  displayCards(myLibrary)
}

function displayCards(array) {
  let content = document.querySelector('.content')
  let bookIndex = 0
  content.textContent = ''
  array.forEach(book => {
    let card = document.createElement('div')
    card.classList.add('card')
    let cardContent = ''
    let isReadID = 'read' + bookIndex
    let buttonID = 'button' + bookIndex
    if (book.isRead) {
      cardContent = `
      <div class='title'>${book.title}</div>
      <div class='author'>${book.author}</div>
      <div class='numPages'>${book.numPages}</div>
      <button class='isRead read' id='${isReadID}' value='${bookIndex}'>Already read</button>
      <button class='remove' id='${buttonID}' value='${bookIndex}'>Remove</button>
      `
    } else {
      cardContent = `
      <div class='title'>${book.title}</div>
      <div class='author'>${book.author}</div>
      <div class='numPages'>${book.numPages}</div>
      <button class='isRead notread' id='${isReadID}' value='${bookIndex}'>Not yet read</button>
      <button class='remove' id='${buttonID}' value='${bookIndex}'>Remove</button>
      `
    }
    card.innerHTML = cardContent
    content.appendChild(card)
    bookIndex += 1

    // Removes associated book object from library on click
    document.getElementById(buttonID).addEventListener('click', (ev) => {
      myLibrary.splice((ev.target.value), 1)
      displayCards(myLibrary);
    })

    document.getElementById(isReadID).addEventListener('click', (ev) => {
      myLibrary[ev.target.value].toggleRead()
      displayCards(myLibrary)
    })
  })
}

function clearFormValues() {
  title.value = ''
  author.value = ''
  numpages.value = ''
  alreadyRead.checked = false
}

function findIndex(bookTitle) {
  let index = myLibrary.findIndex(book => book.title == bookTitle)
  return index
}

function removeBook(book) {
  let index = findIndex(book)
  myLibrary.splice(index, 1)
  displayCards();
}

newBookBtn.addEventListener('click', () => {
  bookForm.classList.add('active')
  clearFormValues()
})

closeBtn.addEventListener('click', () => {
  bookForm.classList.remove('active')
})

submitBtn.addEventListener('click', () => {
  let book = new Book(title.value, author.value, numpages.value)
  if (alreadyRead.checked) {
    book.isRead = true
  }
  addTolibrary(book)
  bookForm.classList.remove('active')
})

// document.getElementById(buttonId).onclick = function(ev) {
//   let removedBook = ev.target.parentNode
//   document.querySelector('.content').removeChild(removedBook)
//   displayCards()
// }

displayCards(myLibrary)