body {
    font-family: Arial, sans-serif;
    background-color: #cce7ff; /* Azul cielo pastel */
    color: black;
    text-align: center;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
}

/* Contenedor principal */
.container {
    width: 50%;
    margin: auto;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 10;
}

/* Pregunta */
.question {
    font-size: 20px;
    color: #003366;
    font-weight: bold;
    margin-bottom: 20px;
}

/* Respuesta y comentarios */
.answer-section textarea, .comments-section textarea {
    width: 100%;
    height: 50px;
    margin: 10px 0;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #003366;
}

button {
    background-color: #003366;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 5px;
}

button:hover {
    background-color: #002244;
}

/* Lista de comentarios */
#comments-list {
    text-align: left;
    margin-top: 20px;
    padding: 10px;
    max-height: 300px;
    overflow-y: auto;
    background-color: white;
    border-radius: 10px;
}

/* Respuesta a comentarios */
.reply {
    margin-left: 20px;
    font-size: 14px;
    color: gray;
}

/* Botón de responder */
.reply-button {
    font-size: 12px;
    background-color: #66a3ff;
    padding: 5px;
    margin-left: 10px;
}

.reply-button:hover {
    background-color: #4477dd;
}

/* Corazones flotantes */
.heart-comment {
    position: absolute;
    background-color: white;
    color: black;
    font-size: 14px;
    border-radius: 50%;
    padding: 15px;
    max-width: 200px;
    text-align: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    opacity: 0.9;
    animation: float 15s linear infinite;
}
