import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAll } from "./BooksAPI";
import { GetShelfs, SetShelfs } from "./BooksContext";
import { plusSrc } from "./Icons";
import SingleBook from "./SingleBook";

function BooksShelf() {
  const [currRead, wantToRead, readDone] = useContext(GetShelfs);
  const [setcurrRead, setWantToRead, setReadDone] = useContext(SetShelfs);

  const currReadElements = currRead?.map((result) => {
    return (
      <SingleBook
        key={`${result.id}finalresult`}
        id={`${result.id}finalresult2`}
        title={result.title}
        imgSrc={result.imageLinks.thumbnail}
        authors={result.authors}
        wholeBook={result}
      />
    );
  });

  const wantToReadElements = wantToRead?.map((result) => {
    return (
      <SingleBook
        key={`${result.id}finalresult`}
        id={`${result.id}finalresult2`}
        title={result.title}
        imgSrc={result.imageLinks.thumbnail}
        authors={result.authors}
        wholeBook={result}
      />
    );
  });

  const readDoneElements = readDone?.map((result) => {
    return (
      <SingleBook
        key={`${result.id}finalresult`}
        id={`${result.id}finalresult2`}
        title={result.title}
        imgSrc={result.imageLinks.thumbnail}
        authors={result.authors}
        wholeBook={result}
      />
    );
  });

  useEffect(() => {
    let test = async () => {
      let all = await getAll();
      
      let tmp = all?.filter((book) => book.shelf === "currentlyReading");
      setcurrRead(tmp);

      tmp = all?.filter((book) => book.shelf === "wantToRead");
      setWantToRead(tmp);

      tmp = all?.filter((book) => book.shelf === "read");
      setReadDone(tmp);
    };

    test();
  }, []);

  return (
    <section className="shelf">
      <header>My books</header>
      <div className="lib">
        <h1>Currently reading</h1>
        <div className="grid-system">{currReadElements}</div>
        <h1>Want to read</h1>
        <div className="grid-system">{wantToReadElements}</div>
        <h1>Read</h1>
        <div className="grid-system">{readDoneElements}</div>
      </div>

      <Link to={"/search"} className="add-book">
        {plusSrc}
      </Link>
    </section>
  );
}

export default BooksShelf;
