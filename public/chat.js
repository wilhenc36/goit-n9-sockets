const socket = io()

let message = document.getElementById("message")
let username = document.getElementById("username")
let btn = document.getElementById("send")
let output = document.getElementById("output")
let actions = document.getElementById("actions")

btn.addEventListener("click", () => {
    socket.emit("client:message", {
        username: username.value,
        message: message.value
    })
})

message.addEventListener("input", () => {
    socket.emit("client:typing", username.value)
})

socket.on("server:message", (data) => {
    actions.innerHTML = ""
    output.innerHTML += `<p>
        <strong>${data.username}<strong>: ${data.message}
    </p>`
})

socket.on("server:typing", (username) => {
    actions.innerHTML = `
        <em>${username} is typing</em>
    `
})