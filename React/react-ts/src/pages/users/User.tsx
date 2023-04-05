import { useState } from 'react';

function User() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        // do something to login the user and set isLoggedIn to true
        setIsLoggedIn(true);
    }

    const handleLogout = () => {
        // do something to logout the user and set isLoggedIn to false
        setIsLoggedIn(false);
        localStorage.removeItem("accessToken");
    }

    return (
        <div>
            {isLoggedIn ? (
                <a href='#' onClick={handleLogout}>logout</a>
            ) : (
                <>
                    <a href='/signin'>Signin</a>
                    <a href='/signup'>Signup</a>
                </>
            )}
        </div>
    );
}

export default User;