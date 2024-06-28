"use strict"

window.onload = () => {

    //get createPost form of page
    const createPostForm = document.querySelector("#addCommentForm");

    //get logout button from page
    const logoutButton = document.getElementById("logoutButton");

    //listen for the form submission
    createPostForm.addEventListener("submit", createPost)

    //listen for event to log user out
    logoutButton.addEventListener("click", logout)

    //function to display message
    displayWelcomeMessage();


}

//function to show message that welcomes user with their username
const displayWelcomeMessage = () => {
    //get log in info
    const loginData = getLoginData();
    //get message from page
    const welcomeMessageElement = document.getElementById("welcomeMessage");
    //get login data and display on page
    if (loginData && loginData.username) {
        welcomeMessageElement.textContent = `Welcome, ${loginData.username}!`;
    }
}

//method/function to create posts
const createPost = async (event) => {

    //call preventDefault to keep the page from reloading
    event.preventDefault();

    //get login data
    const loginData = getLoginData();

    //generate a new form data object
    let formData = new FormData(event.target);

    //generate a javscript object fro, the formData object create above
    let formDataAsObject = Object.fromEntries(formData);

    console.log(formDataAsObject)

    //try catch for error handling
    try {

        //fetch posts
        let response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts/",
            {
                //use method POST to create new posts
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${loginData.token}`,
                },

                //take the data fro, the form and build the body of the request
                body: JSON.stringify(formDataAsObject),
            }

        );

        //turn response in code we can work with
        let newComment = await response.json();

        console.log(newComment, "new comment created")

        //get commentmessage from the page
        let commentMessage = document.getElementById("commentAddedMessage");

        //if respinse is successful display message
        if (response.ok) {
            commentMessage.textContent = "Comment added successfully!";
        } else {
            const error = await response.json();
            commentMessage.textContent = error.message;
        }

        //catch any errors and display on console
    } catch (err) {

        console.log("oops")
    }

}

