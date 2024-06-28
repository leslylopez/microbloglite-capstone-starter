/* Posts Page JavaScript */

"use strict";

window.onload = () => {

    //function that will GET posts
    getPosts();

    //call to the logout button
    const logoutButton = document.getElementById("logoutButton");

    //run logout function
    logoutButton.addEventListener("click", logout)

};

const getPosts = () => {

    const loginData = getLoginData();

    //fetch posts using the GET method
    fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts/", {
        method: "GET",
        headers: {
            //authenticate user for any API requests that require the user to be logged in
            Authorization: `Bearer ${loginData.token}`
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            const postList = document.getElementById("postList");
            //loop over posts
            data.forEach((post) => {
                //create card for post
                const cardHTML =
                    `
            <div class="card">
                <h3>${post.username}</h2>
                <p>${post.text}</p>
                <h6>${new Date(post.createdAt).toLocaleDateString()} ${new Date(post.createdAt).toLocaleTimeString()}</h6>
            </div>
            `;
                //adds new card
                postList.innerHTML += cardHTML;
            });

        });
};
