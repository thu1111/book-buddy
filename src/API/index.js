const BASE_API = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api"


export async function fetchAllBooks() {
    try {
        const response = await fetch (`${BASE_API}/books`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);        
    }
}

export async function fetchSingleBook(id) {
    try {
        const response = await fetch (`${BASE_API}/books/${id}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);        
    }
}

export async function registerUser(firstname,lastname,email,password) {
    try {
        const response = await fetch (`${BASE_API}/users/register`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({firstname,lastname,email,password}),
        })
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);        
    }
}

export async function loginUser(email,password) {
    try {
        const response = await fetch (`${BASE_API}/users/login`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({email,password}),
        })
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);        
    }
}

export async function fetchUser(token) {
    try {
        const response = await fetch (`${BASE_API}/users/me`, {
            headers: {"Content-Type":"application/json",
                "Authorization":`Bearer ${token}`,
            },
        })
        const result = await response.json();
        return result;    
    } catch (error) {
        console.error(error);        
    }
}

export async function fetchCheckout(id, token) {
    try {
        const response = await fetch (`${BASE_API}/books/${id}`, {
            method: "PATCH",
            headers: {"Content-Type":"application/json",
                "Authorization":`Bearer ${token}`,
            },
            body: JSON.stringify({available:false,})
        })
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);        
    }
}


export async function returnBook(id, token) {
    try {
        const response = await fetch (`${BASE_API}/reservations/${id}`, {
            method: "DELETE",
            headers: {"Content-Type":"application/json",
                "Authorization":`Bearer ${token}`,
            },
        })
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);        
    }
}