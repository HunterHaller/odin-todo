// domUpdate.js

export function addHeader(usernameText){
    let usernameHeader = document.createElement("h1");
    usernameHeader.textContent = "Welcome, " + usernameText + "! What needs doing today?";
    document.querySelector("#headerDiv").appendChild(usernameHeader);
}