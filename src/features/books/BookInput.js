import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { addBook, removeBook } from "./booksSlice";

function BookInput() {
  const [formData, setFormData] = useState({
    title: "",
    authorName: "",
  });
  const [bookTitleToRemove, setBookTitleToRemove] = useState("");

  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleRemoveChange(event) {
    setBookTitleToRemove(event.target.value);
  }

  function handleRemoveClick(event) {
    // find the book using its title
    const book = books.find((book) => book.title === bookTitleToRemove);

    // dispatch an action removeBook(book)
    dispatch(removeBook(book.id));

    // clear the input
    setBookTitleToRemove("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    // use the uuid library to generate a unique ID for our books
    const book = { ...formData, id: uuid() };

    dispatch(addBook(book));
    setFormData({
      title: "",
      authorName: "",
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>
          <input
            type="text"
            onChange={handleChange}
            name="title"
            value={formData.title}
            placeholder="book title"
          />
        </p>
        <p>
          <input
            type="text"
            onChange={handleChange}
            name="authorName"
            value={formData.authorName}
            placeholder="author name"
          />
        </p>
        <input type="submit" />
      </form>
      <p>
        <input
          type="text"
          onChange={handleRemoveChange}
          name="removeBook"
          value={bookTitleToRemove}
        />
      </p>
      <button onClick={handleRemoveClick}>Remove Book</button>
    </>
  );
}

export default BookInput;
