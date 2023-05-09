import { DateTime } from '../../modules/luxun.js';
import ListOfBooks from '../../modules/listofbooks.js';

const menu = document.querySelectorAll('.item-menu');
const h1 = document.querySelector('h1');
const contain = document.querySelector('.contain');
const currentDate = document.querySelector('.current-date p');
const listofbooks = new ListOfBooks();
const error = document.getElementById('error');

const menuActive = (menu, active) => {
  for (let i = 0; i < menu.length; i += 1) {
    menu[i].classList.remove('active');
  }
  active.classList.add('active');
};
const formatDate = () => {
  const today = new Date();
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  return today.toLocaleDateString('en-US', options);
};
const generateContactForm = () => {
  const parentElement = document.createElement('div');
  parentElement.classList.add('contact');
  const childElement1 = document.createElement('p');
  const textNode = document.createTextNode(
    'Do you have any questions or you just want to say "Hello"?\r\nYou can reach out to us!',
  );
  childElement1.appendChild(textNode);
  const list = document.createElement('ul');
  const item1 = document.createElement('li');
  item1.innerHTML = '<strong>Our e-mail : </strong><a href="mailto:contact@awesomebooks.org">contact@awesomebooks.org</a>';
  const item2 = document.createElement('li');
  item2.innerHTML = '<strong>Our phone number: </strong><a href="tel:+221 78 012 3456">+221 78 012 3456</a>';
  const item3 = document.createElement('li');
  item3.innerHTML = '<strong>Our address: </strong>Street name 22, 84503 City, Country';
  list.appendChild(item1);
  list.appendChild(item2);
  list.appendChild(item3);
  parentElement.appendChild(childElement1);
  parentElement.appendChild(list);
  contain.innerHTML = '';
  contain.appendChild(parentElement);
};
const validateForm = (event) => {
  event.preventDefault();
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  if (title && title.value === '') {
    error.innerHTML = 'Title is required';
  } else if (author && author.value === '') {
    error.innerHTML = 'Author is required';
  } else {
    const newBook = {
      title: title && title.value,
      author: author && author.value,
      created_at: formatDate(),
      description: '',
    };
    title.value = '';
    author.value = '';
    error.innerHTML = '';

    listofbooks.addBook(newBook);
    return false;
  }
  return true;
};
const generateAddForm = () => {
  const parent = document.createElement('form');
  parent.setAttribute('id', 'add_book');
  parent.setAttribute('action', '#');
  parent.setAttribute('method', 'POST');
  parent.addEventListener('submit', validateForm);
  const l1 = document.createElement('fieldset');
  l1.innerHTML = '<legend><label for="title">Title</label></legend>';
  parent.appendChild(l1);
  // input title
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('name', 'title');
  input.setAttribute('id', 'title');
  input.setAttribute('placeholder', 'Write the title');
  l1.appendChild(input);
  const l2 = document.createElement('fieldset');
  l2.innerHTML = '<legend><label for="author">Author</label></legend>';
  parent.appendChild(l2);
  // input author
  const input2 = document.createElement('input');
  input2.setAttribute('type', 'text');
  input2.setAttribute('name', 'author');
  input2.setAttribute('id', 'author');
  input2.setAttribute('placeholder', 'Write the author');
  l2.appendChild(input2);
  // input file
  const lx = document.createElement('fieldset');
  lx.innerHTML = '<legend><label for="cover">Cover</label></legend>';
  parent.appendChild(lx);
  const inputX = document.createElement('input');
  inputX.setAttribute('type', 'file');
  inputX.setAttribute('name', 'cover');
  inputX.setAttribute('id', 'cover');
  lx.appendChild(inputX);
  // input submit
  const input3 = document.createElement('input');
  input3.setAttribute('type', 'submit');
  input3.setAttribute('value', 'Add');

  parent.appendChild(input3);
  contain.innerHTML = '';
  contain.appendChild(parent);
};

const changeTitle = (itemMenu = '#page-0') => {
  let text = '';
  switch (itemMenu) {
    case '#page-0':
      text = 'All awesome books';
      listofbooks.generateTable();
      break;
    case '#page-1':
      text = 'Add a new book';
      generateAddForm();
      break;
    case '#page-2':
      text = 'Contact information';
      generateContactForm();
      break;
    default:
      text = 'Contact information';
      generateContactForm();
      break;
  }
  h1.innerHTML = text;
};

menu.forEach((x, i) => {
  menu[i].addEventListener('click', () => {
    changeTitle(menu[i].getAttribute('href'));
    menuActive(menu, menu[i]);
  });
});

const generateCurrentDate = () => {
  const now = DateTime.local();
  const formatted = now.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);
  currentDate.innerHTML = formatted;
};

window.addEventListener('DOMContentLoaded', () => {
  setInterval(generateCurrentDate, 1000);
  changeTitle();
  menuActive(menu, menu[0]);

  listofbooks.books = JSON.parse(localStorage.getItem('datas')) ?? [];
  listofbooks.generateTable();
});
