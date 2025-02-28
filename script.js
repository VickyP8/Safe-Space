const JSON_BIN_URL = "https://api.jsonbin.io/v3/b/67c17e13ad19ca34f813f65d"; // Tu URL del Bin
const JSON_BIN_SECRET = "$2a$10$R0KsiREnS15tX9hjDpC4huvKctoqbTXZ395nL7Z2VzuIZeTnm1jNK"; // Tu X-Master-Key

// Cargar comentarios al inicio
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
        comments.forEach(displayComment);
    } catch (error) {
        console.error("Error loading comments:", error);
    }
}

async function addComment() {
    let commentText = document.getElementById("comment").value;
    if (!commentText.trim()) {
        alert("Please write a comment.");
        return;
    }

    try {
        // Obtener comentarios existentes
        const response = await fetch(JSON_BIN_URL, {
            method: "GET",
            headers: {
                "X-Master-Key": JSON_BIN_SECRET
            }
        });
        const data = await response.json();
        const comments = data.record.comments || [];

        // Agregar nuevo comentario
        const newComment = {
            id: Date.now(),
            text: commentText
        };

        comments.push(newComment);

        // Guardar comentarios en JSONBin.io
        await fetch(JSON_BIN_URL, {
            method: "PUT",
            headers: {
                "X-Master-Key": JSON_BIN_SECRET,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ comments })
        });

        // Mostrar comentario en la página
        displayComment(newComment);
        document.getElementById("comment").value = "";
    } catch (error) {
        console.error("Error adding comment:", error);
    }
}

function displayComment(comment) {
    const commentList = document.getElementById("comments-list");
    const commentItem = document.createElement("div");
    commentItem.innerHTML = `<p>${comment.text}</p>`;
    commentList.appendChild(commentItem);
}
