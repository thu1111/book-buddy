/* TODO - add your code to create a functional React component that renders details for a single book. 
Fetch the book data from the provided API. 
You may consider conditionally rendering a 'Checkout' button for logged in users. */
import {useParams} from "react-router-dom"
import { useState,useEffect } from "react";
import { fetchSingleBook } from "../API";
import { fetchCheckout } from "../API";

const SingleBook = () => {
    const {id} = useParams();
    const [book, setBook] = useState({});
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function getBook(){
            const response = await fetchSingleBook(id);
            
            if (response.book !== null & response.book !== undefined) {
                setBook(response.book) 
            } else {
                setError("Cannot fetch your book!")
            }
        }
        getBook();
    }, []);



    const handleCheckout = async () => {
        const response = await fetchCheckout(id, token);

        if (response) {
            setBook(response.book);
        } else {
            setError("Cannot check out the book!");
        }
    }


    return (
        <>
            <div className="selectedBook">
                {error && (<p style={{color: "red"}}>{error}</p>)}

                <div id="highlight">
                    <h3>{book.title}</h3>
                    <img src={book.coverimage} alt="book cover image"/>    
                    <p>by: {book.author}</p>
                </div>

                <div >
                    <p id="details">{book.description}</p>
                    {!token && (<p style={{color: "red"}}>Please Login or Register to checkout this book</p>)}

                    {token && (
                        book.available? <button onClick={()=>handleCheckout()} className="checkButtons">Check out</button>
                                    : <p>This book is currently unavailable to check out.</p>
                    )}
                </div>
            </div>
        </>
     );
}
 
export default SingleBook;