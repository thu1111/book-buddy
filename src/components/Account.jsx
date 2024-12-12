/* TODO - add your code to create a functional React component that renders account details for a logged in user. 
Fetch the account data from the provided API. 
You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import { useState, useEffect } from "react";
import { fetchUser,returnBook } from "../API";

const Account = () => {
    const [user, setUser] = useState({});
    const token = localStorage.getItem("token"); /*Grabbing local token*/
    
    const getUser = async() => {
        const response = await fetchUser(token);       
        
        if(response.email) {
            setUser(response);
        }
    }
    /*trying to let handleReturn use getUser fro re-render*/
    useEffect(() => { /**/
        getUser();
    }, []);

    const handleReturn = async (id) => {
        const response = await returnBook(id, token);
        getUser(); /*trying to re-render*/
    }

    return (
        <div className="meContainer">
        {
            !token && (<p id="accountMessage">Please log in or create an account to continue!</p>)
        }

        {
            user.email && (
                <div className="welcomeContainer">
                    <h1>Welcome {user.firstname}!</h1>
                    <p>email: {user.email}</p>
                    {
                        user.books.length? <h4>My Books</h4>
                                        : <h4>No Book Checked Out!</h4>
                    }
                    
                    <div className="checkedContainer">
                    {
                        user.books && (
                            user.books.map((book)=>{
                                return (
                                    <div key={book.id} className="checkedBook">
                                        <h3>{book.title}</h3>
                                        <img src={book.coverimage} alt="book cover image"/>
                                        <p>by: {book.author}</p>
                                        <button onClick={()=>handleReturn(book.id)} className="checkButtons">Return</button>
                                    </div>
                                )
                            })
                        )
                    }
                    </div>
                </div>
            )
        }
        </div>
    );
}
 
export default Account;