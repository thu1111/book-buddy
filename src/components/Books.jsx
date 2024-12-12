/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. 
Fetch the book data from the provided API. 
Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import { fetchAllBooks } from "../API"; 
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Books = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [searchParam, setSearchParam] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
        async function getBooks() {
            const response = await fetchAllBooks();
            
            if (response) {
                setBooks(response.books);
            } else {
                setError("Cannot fetch books from API");
            }  
        }
        getBooks();
    }, []);
                                            
    const booksToDisplay = searchParam?
    books.filter((book) => book.title.toLowerCase().includes(searchParam.trim()))
    : books;

    return ( 
    <>
        <div className="searchBox">
                <input  type="text" 
                        onChange={(e)=>setSearchParam(e.target.value.toLowerCase())}
                        placeholder="Search your book here..."/>
        </div>

        {error && (<p style={{color: "red"}}>{error}</p>)}

        <div className="cardsContainer">
            {booksToDisplay.map((book)=>{
                return (
                    <div key={book.id} className="bookCard">
                        <h3>{book.title}</h3>
                        <img src={book.coverimage} alt="book cover image" />
                        <p>by: {book.author}</p>
                        <button className="detailButtons"
                                onClick={()=>navigate(`/books/${book.id}`)}
                                > Detail</button>
                    </div>
                )
            })}
        </div>
    </>);
}
 
export default Books;

