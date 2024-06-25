"use strict"

window.onload = () => {

    const createPostForm = document.querySelector("#addCommentForm");

    const logoutButton = document.getElementById("logoutButton");

    createPostForm.addEventListener("submit", createPost)

    logoutButton.addEventListener("click", logout)


}

const createPost = async (event) => {

    event.preventDefault();

    const loginData = getLoginData();

    let formData = new FormData(event.target);

    let formDataAsObject = Object.fromEntries(formData);

    console.log(formDataAsObject)

    try {

        let response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts/",
            {
                method: "POST",
                headers: {"Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${loginData.token}`,
                },

                body: JSON.stringify(formDataAsObject),
            }

        );

        let newComment = await response.json();

        console.log(newComment, "new comment created")

    } catch (err) {

        console.log("oops")
    }

}