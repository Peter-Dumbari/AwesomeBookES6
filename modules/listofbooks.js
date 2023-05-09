import removeBook from './removeBook.js';

const contain = document.querySelector('.contain');

class ListOfBooks {
  books;

  constructor() {
    this.getData();
  }

  getData = () => {
    const data = localStorage.getItem('datas');
    if (data) {
      this.books = JSON.parse(data);
    } else {
      this.books = [];
    }
  };

  setLocalStorage = (newBooks) => localStorage.setItem('datas', JSON.stringify(newBooks));

  addBook = (newBook) => {
    this.books.push(newBook);
    this.setLocalStorage(this.books);
  };

  removeBook = (index) => {
    const filtered = this.books.filter(
      (book) => book.title !== this.books[index].title,
    );
    localStorage.setItem('datas', JSON.stringify(filtered));
  };

  generateTable = () => {
    contain.innerHTML = '';
    const table = document.createElement('table');
    // header
    const thead = document.createElement('tr');
    const th1 = document.createElement('th');
    th1.textContent = '#';
    const th2 = document.createElement('th');
    th2.textContent = 'Title';
    const th3 = document.createElement('th');
    th3.textContent = 'Author';
    const th4 = document.createElement('th');
    th4.textContent = 'Created';
    const th5 = document.createElement('th');
    th5.textContent = 'Actions';
    thead.appendChild(th1);
    thead.appendChild(th2);
    thead.appendChild(th3);
    thead.appendChild(th4);
    thead.appendChild(th5);
    table.appendChild(thead);
    // body
    this.books.forEach((bk, i) => {
      const tbody = document.createElement('tr');
      const th11 = document.createElement('th');
      th11.textContent = i + 1;
      const th12 = document.createElement('td');
      th12.textContent = bk.title;
      const th13 = document.createElement('td');
      th13.textContent = bk.author;
      const th14 = document.createElement('td');
      th14.textContent = bk.created_at;
      const th15 = document.createElement('td');
      const deleteLink = document.createElement('a');
      deleteLink.setAttribute('href', '#');
      deleteLink.setAttribute('class', 'dismiss');
      deleteLink.setAttribute('id', `l${i}`);
      const deleteIcon = document.createElement('i');
      deleteIcon.setAttribute('class', 'fa fa-trash-o');
      deleteIcon.setAttribute('aria-hidden', 'true');
      deleteLink.appendChild(deleteIcon);
      deleteLink.addEventListener('click', () => {
        removeBook(i, ListOfBooks);
      });
      th15.appendChild(deleteLink);
      tbody.appendChild(th11);
      tbody.appendChild(th12);
      tbody.appendChild(th13);
      tbody.appendChild(th14);
      tbody.appendChild(th15);
      table.appendChild(tbody);
    });
    contain.appendChild(table);
  };
}

export default ListOfBooks;
