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

        if(response) {
            setUser(response);
        }
    }
    /*trying to let handleReturn use */
    useEffect(() => { 
        getUser();
    }, []);


    const handleReturn = async (id) => {
        const response = await returnBook(id, token);
        getUser(); /*trying to re-render*/
    }

    return (
        <>
        {
            !token && (<p style={{color: "red"}}>Please log in or create an account to continue!</p>)
        }

        {
            user.email && (
                <>
                    <h3>Welcome {user.firstname}!</h3>
                    <p>User email: {user.email}</p>
                    {
                        user.books.length? <h4>My Books</h4>
                                        : <h4>No Book Checked Out!</h4>
                    }
                    {
                        user.books && (
                            user.books.map((book)=>{
                                return (
                                    <div key={book.id} className="checkedBook">
                                        <h4>{book.title}</h4>
                                        <img src={book.coverimage}/>
                                        <button onClick={()=>handleReturn(book.id)}>Return</button>
                                    </div>
                                )
                            })
                        )
                    }
                </>
            )
        }
        </>
    );
}
 
export default Account;