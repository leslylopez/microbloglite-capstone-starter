"use strict"

window.onload = () => {

    const registrationForm = document.querySelector("#registrationForm");

    registrationForm.addEventListener("submit", creatingAUser)

}

const creatingAUser = async (event) => {

    event.preventDefault();

    let formData = new FormData(event.target);

    let formDataAsObject = Object.fromEntries(formData)

    try {

        let response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/",
            {

                method: "POST",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify(formDataAsObject)
            }

        );

        let errorMessage = document.getElementById("errorMessage");

        if (response.ok) {
            errorMessage.textContent = "Registration successful!";
        } else {
            const error = await response.json();
            errorMessage.textContent = error.message;
        }

    } catch (err) {

        errorMessage.textContent = "Error registering user";
    }

};
