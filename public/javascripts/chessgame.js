const socket = io(); // Assume socket connection is working, this is for real-time communication.

const chess = new Chess();
const boardElement = document.querySelector(".chessboard");

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

// Unicode mapping for each piece
const unicodePieces = {
    'p': '♙',  // Black Pawn
    'r': '♜',  // Black Rook
    'n': '♞',  // Black Knight
    'b': '♝',  // Black Bishop
    'q': '♛',  // Black Queen
    'k': '♚',  // Black King
    'P': '♟',  // White Pawn
    'R': '♖',  // White Rook
    'N': '♘',  // White Knight
    'B': '♗',  // White Bishop
    'Q': '♕',  // White Queen
    'K': '♔'   // White King
};

// This function gets the Unicode symbol for a piece
function getPieceUnicode(piece) {
    return unicodePieces[piece.type] || ''; // If no piece found, return an empty string.
}

// Render the chessboard
const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = ""; // Clear the previous board content
    board.forEach((row, rowindex) => {
        row.forEach((square, squareindex) => {
            const squareElement = document.createElement("div");
            squareElement.classList.add(
                "square",
                (rowindex + squareindex) % 2 === 0 ? "Light" : "dark"
            );
            squareElement.dataset.row = rowindex;
            squareElement.dataset.col = squareindex;

            if (square) {
                const pieceElement = document.createElement("div");
                pieceElement.classList.add(
                    "piece",
                    square.color === "w" ? "white" : "black"
                );

                // Set the Unicode symbol for the piece
                pieceElement.innerText = getPieceUnicode(square); // Use getPieceUnicode function to get the symbol
                pieceElement.draggable = playerRole === square.color;

                pieceElement.addEventListener("dragstart", (e) => {
                    if (pieceElement.draggable) {
                        draggedPiece = pieceElement;
                        sourceSquare = { row: rowindex, col: squareindex };
                        e.dataTransfer.setData("text/plain", "");
                    }
                });

                pieceElement.addEventListener("dragend", () => {
                    draggedPiece = null;
                    sourceSquare = null;
                });

                squareElement.appendChild(pieceElement);
            }

            // Handle drag-over and drop actions
            squareElement.addEventListener("dragover", (e) => {
                e.preventDefault();
            });

            squareElement.addEventListener("drop", (e) => {
                e.preventDefault();
                if (draggedPiece) {
                    const targetSquare = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col),
                    };

                    handleMove(sourceSquare, targetSquare);
                }
            });

            boardElement.appendChild(squareElement);
        });
    });
    if (playerRole === "b"){
        boardElement.classList.add("flipped");
    }
    else{
        boardElement.classList.remove("flipped");
    }
};

// Handle move logic
const handleMove = (source, target) => {
    // Correct the chess notation logic (converting columns to a-h and rows to 1-8)
    const move = {
        from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`, // Converts col to letter and row to number
        to: `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
        promotion: "q" // Example promotion to Queen (you can make this dynamic)
    };

    // Emit the move event
    socket.emit("move", move);

    // Handle the move in the chess game logic
    const moveResult = chess.move(move);
    if (moveResult) {
        renderBoard(); // Re-render the board after a successful move
    }
};

// Socket listeners
socket.on("playerRole", function (role) {
    playerRole = role;
    renderBoard();
});

socket.on("boardState", function (fen) {
    chess.load(fen);
    renderBoard();
});

socket.on("move", function (move) {
    chess.move(move);
    renderBoard();
});

// Initially render the board
renderBoard();
