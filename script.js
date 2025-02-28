document.addEventListener("DOMContentLoaded", () => {
    loadComments(); // Cargar comentarios guardados al abrir la página
});

function submitAnswer() {
    let answerText = document.getElementById("answer").value;
    if (answerText.trim() !== "") {
        document.querySelector(".answer-section h2").innerHTML = "Answer: " + answerText;
        document.getElementById("answer").value = "";
    } else {
        alert("Please write an answer.");
    }
}

function addComment(parentIndex = null) {
    let commentText = document.getElementById("comment").value;
    let fileInput = document.getElementById("fileInput").files[0];

    if (commentText.trim() !== "" || fileInput) {
        saveComment(commentText, fileInput, parentIndex);
        document.getElementById("comment").value = "";
        document.getElementById("fileInput").value = "";
    } else {
        alert("Please write a comment or upload a file.");
    }
}

// Guardar comentarios en LocalStorage
function saveComment(text, file, parentIndex) {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    
    let newComment = { text: text, file: null, type: null, replies: [] };

    if (file) {
        const fileType = file.type.split("/")[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            newComment.file = event.target.result;
            newComment.type = fileType;

            if (parentIndex !== null) {
                comments[parentIndex].replies.push(newComment);
            } else {
                comments.push(newComment);
            }

            localStorage.setItem("comments", JSON.stringify(comments));
            renderComments();
        };
        reader.readAsDataURL(file);
    } else {
        if (parentIndex !== null) {
            comments[parentIndex].replies.push(newComment);
        } else {
            comments.push(newComment);
        }

        localStorage.setItem("comments", JSON.stringify(comments));
        renderComments();
    }
}

// Cargar comentarios desde LocalStorage
function loadComments() {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    document.getElementById("comments-list").innerHTML = "";
    document.querySelector(".hearts-container").innerHTML = "";

    comments.forEach((comment, index) => createHeartComment(comment, index));
}

// Crear comentarios flotantes con forma de corazón
function createHeartComment(comment, index, isReply = false, parentDiv = null) {
    const heartComment = document.createElement("div");
    heartComment.classList.add("heart-comment");
    heartComment.innerHTML = `<p>${comment.text}</p>`;

    if (comment.file) {
        if (comment.type === "image") {
            const img = document.createElement("img");
            img.src = comment.file;
            img.style.width = "100px";
            img.style.borderRadius = "10px";
            heartComment.appendChild(img);
        } else if (comment.type === "audio") {
            const audio = document.createElement("audio");
            audio.src = comment.file;
            audio.controls = true;
            heartComment.appendChild(audio);
        }
    }

    // Posición aleatoria en los lados
    heartComment.style.left = Math.random() > 0.5 ? "5vw" : "85vw";
    heartComment.style.top = Math.random() * 80 + "vh";

    // Botón para responder
    const replyButton = document.createElement("button");
    replyButton.innerText = "Reply";
    replyButton.onclick = () => replyToComment(index);
    heartComment.appendChild(replyButton);

    document.querySelector(".hearts-container").appendChild(heartComment);
    addCommentToList(comment, index);
}

// Agregar comentarios en lista fija
function addCommentToList(comment, index) {
    const commentList = document.getElementById("comments-list");
    const commentItem = document.createElement("div");

    commentItem.innerHTML = `<p>${comment.text}</p>`;

    if (comment.file) {
        if (comment.type === "image") {
            const img = document.createElement("img");
            img.src = comment.file;
            img.style.width = "100px";
            img.style.borderRadius = "10px";
            commentItem.appendChild(img);
        } else if (comment.type === "audio") {
            const audio = document.createElement("audio");
            audio.src = comment.file;
            audio.controls = true;
            commentItem.appendChild(audio);
        }
    }

    // Botón para responder
    const replyButton = document.createElement("button");
    replyButton.innerText = "Reply";
    replyButton.onclick = () => replyToComment(index);
    commentItem.appendChild(replyButton);

    // Sección de respuestas
    const repliesDiv = document.createElement("div");
    repliesDiv.classList.add("replies");
    comment.replies.forEach((reply, replyIndex) => {
        createHeartComment(reply, replyIndex, true, repliesDiv);
    });

    commentItem.appendChild(repliesDiv);
    commentList.appendChild(commentItem);
}

// Función para responder a un comentario
function replyToComment(index) {
    let replyText = prompt("Write your reply:");
    if (replyText) {
        saveComment(replyText, null, index);
    }
}

// Renderizar comentarios actualizados
function renderComments() {
    document.getElementById("comments-list").innerHTML = "";
    document.querySelector(".hearts-container").innerHTML = "";
    loadComments();
}

function renderComments() {
    document.getElementById("comments-list").innerHTML = "";
    document.querySelector(".hearts-container").innerHTML = "";
    loadComments();
}
