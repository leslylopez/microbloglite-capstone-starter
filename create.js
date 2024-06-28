"use strict"

window.onload = () => {
    // Get registration form from HTML page
    const registrationForm = document.querySelector("#registrationForm");

    //listen for the form submission and call creatingAUser
    registrationForm.addEventListener("submit", creatingAUser)

}

//method/function to create a course
const creatingAUser = async (event) => {

    //call preventDefault to keep the page from reloading
    event.preventDefault();

    //generate a new form data object
    let formData = new FormData(event.target);

    //generate a Javascript Object fro, the formData object create above
    let formDataAsObject = Object.fromEntries(formData)

    //try catch for error handling
    try {

        //create a fetch (POST) resquest to create a comment in the API
        let response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/",
            {

                method: "POST",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify(formDataAsObject)
            }

        );

        //get error from page 
        let errorMessage = document.getElementById("errorMessage");

        //show message if registration was successful or if there's an error
        if (response.ok) {
            errorMessage.textContent = "Registration successful!";
        } else {
            const error = await response.json();
            errorMessage.textContent = error.message;
        }

    } catch (err) {

        //show error message if registration was unsuccessful
        errorMessage.textContent = "Error registering user";
    }

};
