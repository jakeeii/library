const newBookBtn = document.querySelector('.newbookbtn')
const bookForm = document.querySelector('#bookform')
const closeBtn = document.querySelector('.closebtn')
const title = document.querySelector('#title')
const author = document.querySelector('#author')
const numpages = document.querySelector('#numpages')
const alreadyRead = document.querySelector('#isread')
const submitBtn = document.querySelector('.submit')
const removeBookBtn = document.querySelector('.remove')

let myLibrary = []

class Book {
  constructor(title, author, numPages, isRead = false) {
    this.title = title
    this.author = author
    this.numPages = numPages
    this.isRead = isRead   
  }

  toggleRead() {
    this.isRead = !this.isRead
  }
}

function addTolibrary(book) { 
  myLibrary.push(book)
  displayCards(myLibrary)
}

//Loops through and displays each book in myLibrary as a card
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

    // Toggles read status of associated book object
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

//Adds red border around each invalid required form field
//Probably too many ifs...
function validateForm() {
  invalid = []
  if (title.value == "") {
    invalid.push(title)
  }
  if (author.value == "") {
    invalid.push(author)
  }
  if (numpages.value == "") {
    invalid.push(numpages)
  }
  if (invalid.length !== 0) {
  invalid.forEach(ele => ele.style.border = "1px solid red")
  alert('Please fill out all fields.')
  return
  }
}

//Removes red border from previous invalid but now valid form fields
function clearFormStyling() {
  fields = [title, author, numpages]
  fields.forEach(ele => ele.style.border = "none")
}

newBookBtn.addEventListener('click', () => {
  bookForm.classList.add('active')
  clearFormValues()
})

closeBtn.addEventListener('click', () => {
  bookForm.classList.remove('active')
})

submitBtn.addEventListener('click', () => {
  clearFormStyling()
  if (title.value == "" || author.value == "" || numpages.value == "") {
    validateForm()
    return
  }
  let book = new Book(title.value, author.value, numpages.value)
  if (alreadyRead.checked) {
    book.isRead = true
  }
  addTolibrary(book)
  bookForm.classList.remove('active')
})

displayCards(myLibrary)