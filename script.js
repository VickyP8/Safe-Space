const JSON_BIN_URL = "https://api.jsonbin.io/v3/b/67c17e13ad19ca34f813f65d"; // Tu URL del Bin
const JSON_BIN_SECRET = "$2a$10$R0KsiREnS15tX9hjDpC4huvKctoqbTXZ395nL7Z2VzuIZeTnm1jNK"; // Tu X-Master-Key

document.addEventListener("DOMContentLoaded", loadComments);

async function loadComments() {
    try {
        const response = await fetch(JSON_BIN_URL, {
            method: "GET",
            headers: {
                "X-Master-Key": JSON_BIN_SECRET
            }
        });
        const data = await response.json();
        const comments = data.record.comments || [];
        document.getElementById("comments-list").innerHTML = "";
        document.querySelector(".hearts-container").innerHTML = "";
        comments.forEach(comment => {
            displayComment(comment, null);
            createFloatingHeart(comment.text);
        });
    } catch (error) {
        console.error("Error loading comments:", error);
    }
}

async function addComment(parentId = null) {
    let commentText = document.getElementById("comment").value;
    if (!commentText.trim()) {
        alert("Please write a comment.");
        return;
    }

    try {
        const response = await fetch(JSON_BIN_URL, {
            method: "GET",
            headers: {
                "X-Master-Key": JSON_BIN_SECRET
            }
        });
        const data = await response.json();
        const comments = data.record.comments || [];

        const newComment = {
            id: Date.now(),
            text: commentText,
            parentId: parentId,
            replies: []
        };

        if (parentId) {
            const parentComment = comments.find(c => c.id === parentId);
            if (parentComment) {
                parentComment.replies.push(newComment);
            }
        } else {
            comments.push(newComment);
        }

        await fetch(JSON_BIN_URL, {
            method: "PUT",
            headers: {
                "X-Master-Key": JSON_BIN_SECRET,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ comments })
        });

        document.getElementById("comment").value = "";
        document.getElementById("comments-list").innerHTML = "";
        comments.forEach(comment => {
            displayComment(comment, null);
            createFloatingHeart(comment.text);
        });

    } catch (error) {
        console.error("Error adding comment:", error);
    }
}

function createFloatingHeart(text) {
    const heart = document.createElement("div");
    heart.classList.add("heart-comment");
    heart.innerText = text;

    document.querySelector(".hearts-container").appendChild(heart);

    heart.style.left = Math.random() > 0.5 ? "5vw" : "85vw";
    heart.style.top = Math.random() * 80 + "vh";
    heart.style.animationDuration = Math.random() * 5 + 10 + "s";
}

function displayComment(comment, parentElement) {
    const commentList = parentElement || document.getElementById("comments-list");
    const commentItem = document.createElement("div");
    commentItem.classList.add("comment");
    commentItem.innerHTML = `<p>${comment.text}</p>`;

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

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.onclick = () => deleteComment(comment.id);
    commentItem.appendChild(deleteButton);

    commentList.appendChild(commentItem);
}
