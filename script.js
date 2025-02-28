// Configuración de Firebase
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_PROYECTO.firebaseapp.com",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_PROJECT_ID.appspot.com",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Agregar comentario
function addComment() {
    let commentText = document.getElementById("comment").value;
    let fileInput = document.getElementById("fileInput").files[0];

    if (commentText.trim() !== "" || fileInput) {
        let comment = {
            text: commentText,
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

// Mostrar comentarios en tiempo real
db.collection("comments").orderBy("timestamp").onSnapshot(snapshot => {
    document.getElementById("comments-list").innerHTML = "";
    document.querySelector(".hearts-container").innerHTML = "";

    snapshot.forEach(doc => {
        let comment = doc.data();
        displayComment(comment.text);
    });
});

// Mostrar comentario en pantalla y en corazones flotantes
function displayComment(text) {
    const commentList = document.getElementById("comments-list");
    const commentItem = document.createElement("div");
    commentItem.innerHTML = `<p>${text}</p>`;

    commentList.appendChild(commentItem);
    createFloatingHeart(text);
}

// Crear corazones flotantes con comentarios
function createFloatingHeart(text) {
    const heartComment = document.createElement("div");
    heartComment.classList.add("heart-comment");
    heartComment.innerText = text;

    document.querySelector(".hearts-container").appendChild(heartComment);

    heartComment.style.left = Math.random() > 0.5 ? "5vw" : "85vw";
    heartComment.style.top = Math.random() * 80 + "vh";
    heartComment.style.animationDuration = Math.random() * 5 + 10 + "s";
}
