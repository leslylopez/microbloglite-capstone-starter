/* Posts Page JavaScript */

"use strict";

window.onload = () => {

    getPosts();


}

const getPosts = () => {

    const loginData = getLoginData();

    fetch ("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", {
    method: "GET",
    headers: {


        Authorization: `Bearer ${loginData.token}`
    }


    })

    .then((response) => response.json())
    .then((data) => {

        console.log(data,)
    })

}