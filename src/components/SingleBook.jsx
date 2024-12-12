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
                
                <h3>{book.title}</h3>
                <p>by: {book.author}</p>
                <p>{book.description}</p>
                <img src={book.coverimage} alt="" />

                {!token && (<p>Please Login or Register to checkout this book</p>)}

                {token && (
                    book.available? <button onClick={()=>handleCheckout()}>Check out</button>
                                : <p>This book is currently unavailable to check out.</p>
                )}
            </div>
        </>
     );
}
 
export default SingleBook;