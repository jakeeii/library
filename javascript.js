const newBookBtn = document.querySelector('.newbookbtn')
const bookForm = document.querySelector('#bookform')
const closeBtn = document.querySelector('.closebtn')
const title = document.querySelector('#title')
const author = document.querySelector('#author')
const numpages = document.querySelector('#numpages')
const alreadyRead = document.querySelector('#isread')
const submitBtn = document.querySelector('.submit')

const HP = new Book('Harry Potter: Prisoner of Azkaban', 'J.K. Rowling', 317, true)
const LOTR = new Book('Lord of the Rings', 'J.R.R. Tolkien', 347, false)

let myLibrary = [HP, LOTR]

function Book(title, author, numPages, isRead = false) {
  this.title = title
  this.author = author
  this.numPages = numPages
  this.isRead = isRead
}

function addTolibrary(book) { 
  myLibrary.push(book)
}

function displayCards(array) {
  let content = document.querySelector('.content')
  content.textContent = ''
  array.forEach(book => {
    let card = document.createElement('div')
    card.classList.add('card')
    let cardContent = ''
    if (book.isRead) {
      cardContent = `
      <div class='title'>${book.title}</div>
      <div class='author'>${book.author}</div>
      <div class='numPages'>${book.numPages}</div>
      <button class='isRead'>Already read</button>
      <button class='remove'>Remove</button>
      `
    } else {
      cardContent = `
      <div class='title'>${book.title}</div>
      <div class='author'>${book.author}</div>
      <div class='numPages'>${book.numPages}</div>
      <button class='isRead'>Not yet read</button>
      <button class='remove'>Remove</button>
      `
    }
    card.innerHTML = cardContent
    content.appendChild(card)
  })
}

function clearFormValues() {
  title.value = ''
  author.value = ''
  numpages.value = ''
  alreadyRead.checked = false
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
  displayCards(myLibrary)
})


displayCards(myLibrary)