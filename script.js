const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

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
            text: commentText,
            fileUrl: fileInput ? URL.createObjectURL(fileInput) : null,
            fileType: fileInput ? fileInput.type : null,
            parentId: parentId,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };

        db.collection("comments").add(comment).then(() => {
            document.getElementById("comment").value = "";
            document.getElementById("fileInput").value = "";
        });
    } else {
        alert("Please write a comment or upload a file.");
    }
}

function loadComments() {
    db.collection("comments").orderBy("timestamp").onSnapshot((snapshot) => {
        document.getElementById("comments-list").innerHTML = "";
        document.querySelector(".hearts-container").innerHTML = "";

        snapshot.forEach((doc) => {
            displayComment(doc.data(), doc.id);
        });
    });
}

function displayComment(comment, id) {
    const commentList = document.getElementById("comments-list");
    const commentItem = document.createElement("div");
    commentItem.innerHTML = `<p>${comment.text}</p>`;

    const replyButton = document.createElement("button");
    replyButton.innerText = "Reply";
    replyButton.classList.add("reply-button");
    replyButton.onclick = () => {
        let replyText = prompt("Write your reply:");
        if (replyText) {
            addComment(id, replyText);
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

document.addEventListener("DOMContentLoaded", loadComments);
