document.addEventListener("DOMContentLoaded", loadComments);

function submitAnswer() {
    let answerText = document.getElementById("answer").value;
    if (answerText.trim() !== "") {
        document.querySelector(".answer-section h2").innerHTML = "Answer: " + answerText;
        document.getElementById("answer").value = "";
    } else {
        alert("Please write an answer.");
    }
}

function addComment(parentId = null) {
    let commentText = document.getElementById("comment").value;
    let fileInput = document.getElementById("fileInput").files[0];

    if (commentText.trim() !== "" || fileInput) {
        let comment = {
            id: Date.now(),
            text: commentText,
            file: fileInput ? URL.createObjectURL(fileInput) : null,
            fileType: fileInput ? fileInput.type : null,
            parentId: parentId
        };

        saveComment(comment);
        document.getElementById("comment").value = "";
        document.getElementById("fileInput").value = "";
    } else {
        alert("Please write a comment or upload a file.");
    }
}

function saveComment(comment) {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.push(comment);
    localStorage.setItem("comments", JSON.stringify(comments));
    displayComments();
}

function loadComments() {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.forEach(displayComment);
}

function displayComments() {
    document.getElementById("comments-list").innerHTML = "";
    document.querySelector(".hearts-container").innerHTML = "";

    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.forEach(displayComment);
}

function displayComment(comment) {
    const commentList = document.getElementById("comments-list");
    const commentItem = document.createElement("div");
    commentItem.innerHTML = `<p>${comment.text}</p>`;

    if (comment.file) {
        if (comment.fileType.startsWith("image")) {
            const img = document.createElement("img");
            img.src = comment.file;
            img.style.width = "100px";
            img.style.borderRadius = "10px";
            commentItem.appendChild(img);
        } else if (comment.fileType.startsWith("audio")) {
            const audio = document.createElement("audio");
            audio.src = comment.file;
            audio.controls = true;
            commentItem.appendChild(audio);
        }
    }

    const replyButton = document.createElement("button");
    replyButton.innerText = "Reply";
    replyButton.classList.add("reply-button");
    replyButton.onclick = () => {
        let replyText = prompt("Write your reply:");
        if (replyText) {
            addComment(comment.id, replyText);
        }
    };
    commentItem.appendChild(replyButton);

    commentList.appendChild(commentItem);
    createFloatingHeart(comment.text);
}

function createFloatingHeart(text) {
    const heartComment = document.createElement("div");
    heartComment.classList.add("heart-comment");
    heartComment.innerText = text;

    document.querySelector(".hearts-container").appendChild(heartComment);

    heartComment.style.left = Math.random() > 0.5 ? "5vw" : "85vw";
    heartComment.style.top = Math.random() * 80 + "vh";
}
