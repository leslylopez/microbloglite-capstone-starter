/* Posts Page JavaScript */

"use strict";

window.onload = () => {

    getPosts();

    const logoutButton = document.getElementById("logoutButton");

    logoutButton.addEventListener("click", logout)

};

const getPosts = () => {

    const loginData = getLoginData();

    fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts/", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${loginData.token}`
        }
    })
        .then((response) => response.json())
        .then((data) => {

            console.log(data,)
            const postList = document.getElementById("postList");
            data.forEach((post) => {
                const cardHTML = 
                `
            <div class="card">
                <h3>${post.username}</h2>
                <p>${post.text}</p>
                <h6>${new Date(post.createdAt).toLocaleDateString()} ${new Date(post.createdAt).toLocaleTimeString()}</h6>
            </div>
            `;
                postList.innerHTML += cardHTML;
            });

        });
};
