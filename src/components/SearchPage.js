import { Link } from "react-router-dom";
import { backArrow } from "./Icons";
import { search } from "./BooksAPI";
import { useEffect, useState } from "react";
import SingleBook from "./SingleBook";

function SearchPage() {
  const [query, setQuery] = useState(null);
  const [results, setResults] = useState([]);
  let elements;

  useEffect(() => {
    const handleChnage = async (value) => {
      const data = await search(value);
      setResults(data);
    };

    if (query) {
      handleChnage(query);
    }
  }, [query]);

  elements = <h3 className="note">Start Searching</h3>;
  if (results?.length) {
    elements = results.map((result) => {
      return (
        <SingleBook
          key={`${result?.id}map`}
          id={result?.id}
          title={result?.title}
          imgSrc={result.imageLinks?.thumbnail}
          authors={result?.authors}
          wholeBook={result}
        />
      );
    });
  } else if (query) {
    elements = <h3 className="note">Sorry Nothing is found</h3>;
  }

  return (
    <section className="search-page">
      <header>
        <Link to={"/"}>{backArrow}</Link>
        <input type="text" onChange={(event) => setQuery(event.target.value)} />
      </header>

      <div className="grid-system">{elements}</div>
    </section>
  );
}

export default SearchPage;
