import { useContext, useEffect, useRef } from "react";
import { caret } from "./Icons";
import { getAll, update } from "./BooksAPI";
import { SetShelfs } from "./BooksContext";

function SingleBook({ id, imgSrc, title, authors, wholeBook }) {
  const currEle = useRef(null);

  const [setcurrRead, setWantToRead, setReadDone] = useContext(SetShelfs);

  const showFilter = (event) => {
    const cond = event.currentTarget.classList.contains("active");
    const allBooks = document.querySelectorAll(".show-filter");

    allBooks.forEach((book) => {
      if (book.classList.contains("active")) {
        book.classList.remove("active");
      }
    });

    if (!cond) {
      event.currentTarget.classList.add("active");
      currEle.current = event.currentTarget;
    }
  };

  useEffect(() => {
    document.addEventListener("click", function (event) {
      let tests = [
        currEle.current?.children[0],
        currEle.current?.children[1],
        currEle.current?.children[0].children[0],
      ];

      let cond = true;

      for (let child of tests) {
        if (child === event.target) cond = false;
      }

      if (event.target !== currEle.current && cond) {
        currEle.current?.classList.remove("active");
        currEle.current = null;
      }
    });
  }, []);

  const handleAdding = async (wholeBook, shelf) => {
    await update(wholeBook, shelf);
    let all = await getAll();

    let tmp = all.filter((book) => book.shelf === "currentlyReading");
    setcurrRead(tmp);

    tmp = all.filter((book) => book.shelf === "wantToRead");
    setWantToRead(tmp);

    tmp = all.filter((book) => book.shelf === "read");
    setReadDone(tmp);
  };

  return (
    <div className="book" key={id}>
      <div className="thumbnail">
        <img src={imgSrc} />
        <div className="show-filter" onClick={showFilter}>
          {caret}
          <ul className="move-to">
            <li onClick={() => handleAdding(wholeBook, "currentlyReading")}>
              Currently reading
            </li>
            <li onClick={() => handleAdding(wholeBook, "wantToRead")}>
              Want to read
            </li>
            <li onClick={() => handleAdding(wholeBook, "read")}>Read</li>
            <li onClick={() => handleAdding(wholeBook, "none")}>None</li>
          </ul>
        </div>
      </div>
      <div className="text">
        <h4>{title}</h4>
        <p>{authors?.join(", ")}</p>
      </div>
    </div>
  );
}

export default SingleBook;
