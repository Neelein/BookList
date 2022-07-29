const bookName=document.getElementById('bookName')
const author=document.getElementById('author')
const Isbn=document.getElementById('isbn')
const bookList=document.querySelector('.list')
const bookInfo=document.querySelector('.book-info')

class CurrentTime{
    static getTime(){
        let time=new Date()
        let date=time.getTime()

        return date
    }
}

class Book{
    constructor(bookName,author){
        this.bookName=bookName
        this.author=author
        this.Isbn='#' + CurrentTime.getTime()
    }
}

class UI{
    static displaybooks(){
        const book=Store.getList()

        book.forEach((book)=>{
            UI.addBook(book)
        })
    }

    static addBook(book){
        const row=document.createElement('tr')
        row.innerHTML=`
        <td>${book.bookName}</td>
        <td>${book.author}</td>
        <td>${book.Isbn}</td>
        <td class="delete">x</td>`
        bookList.appendChild(row)
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.remove()
        }
    }

    static clearFile(){
        bookName.value=''
        author.value=''
    }

    static showAlert(message){
        alert(message)
    }
}

class Store{
    static getList(){
        let books

        if(localStorage.getItem('books')===null){
            books=[]
        }else{
            books=JSON.parse(localStorage.getItem('books'))
        }

        return books
    }

    static addList(book){
        const books=Store.getList()

        books.push(book)
        localStorage.setItem('books',JSON.stringify(books))
    }

    static removeList(Isbn){
        const books=Store.getList()

        let newList=books.filter((book)=>{
            return book.Isbn!==Isbn
        })

        localStorage.setItem('books',JSON.stringify(newList))
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    UI.displaybooks()
})

bookInfo.addEventListener('submit',(e)=>{
    e.preventDefault()

    let message="please fill the data"

    if(bookName.value===''||author.value===''){
        UI.showAlert(message)
    }
    else{
        const book=new Book(bookName.value,author.value)
        UI.addBook(book)
        Store.addList(book)
        UI.clearFile()
    }
})

bookList.addEventListener('click',(e)=>{
    UI.deleteBook(e.target)
    Store.removeList(e.target.previousElementSibling.innerText)
})
