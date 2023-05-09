const removeBook = (index, ListOfBooks) => {
  const listofbooks = new ListOfBooks();

  listofbooks.removeBook(index);
  listofbooks.getData();
  listofbooks.generateTable();
};

export default removeBook;
