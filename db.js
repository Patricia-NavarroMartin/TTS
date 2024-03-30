// MVP: Save new words in cookies and allow user to export/import the data

export function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Set expiration date
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/"; // Set cookie
}


export function getCookie(name) {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}

export function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

export function getAllCookies() {
    const cookieString = document.cookie; // Get the cookie string
    const cookies = {}; // Object to store parsed cookies

    // Split the cookie string into individual cookies
    const cookieArray = cookieString.split(';');

    // Iterate over each cookie and parse its name and value
    cookieArray.forEach(cookie => {
        const [name, value] = cookie.trim().split('=');
        cookies[name] = decodeURIComponent(value); // Decode URI-encoded value and store in object
    });

    return cookies;
}

export function getCustomPhrasesFromCategory(category) {
    const cookieString = document.cookie; // Get the cookie string
    const customPhrases = []; // Array to store parsed cookies

    // Split the cookie string into individual cookies:  { cookie1: 'value1', cookie2: 'value2', ... }
    const cookies = getAllCookies();
    console.log(cookies);

    // Iterate over each cookie and parse its name and value
    const keys = Object.keys(cookies);
    keys.forEach(key => {
        if (key.includes(category)) {
            const value = cookies[key];
            //console.log("The key: "+ key + " includes the category name: "+ category + " and its value is: "+ value);
            customPhrases.push(value);
        }
    })

    //Must return an array of strings
    return customPhrases;
}

