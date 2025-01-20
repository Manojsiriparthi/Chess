# Chess Game Platform (Clone of Chess.com)

This application is a real-time chess game platform built using **Node.js** and **Express.js** for the backend, with the frontend designed for a seamless user experience. The platform allows users to play chess games in real-time, similar to popular chess sites like **Chess.com**.
![chess Game Interface](https://ik.imagekit.io/vinaymry/Screenshot%202025-01-20%20144218.png?updatedAt=1737367751761)


## Key Features:

### 1. Real-Time Multiplayer Chess:
- Users can connect with other players around the world and engage in real-time chess matches.
- The platform uses **Socket.IO** for seamless and instant communication between players, ensuring that moves and game states are synchronized in real-time.

### 2. User Authentication and Profile Management:
- Players can register and log in to their accounts.
- Each player has a personal profile that keeps track of their past games, ratings, and other statistics.

### 3. Game Board and UI:
- The game board interface is interactive, showing live updates to moves and game progress.
- The frontend is responsive, ensuring a smooth experience across desktop and mobile devices.

### 4. Real-Time Game Notifications:
- Players receive notifications on the game status (such as opponent moves, check, checkmate, etc.).
- **Socket.IO** ensures the notifications are delivered in real-time, enhancing the interactive experience.

### 5. Turn-based Gameplay:
- The game is turn-based, with each player moving their pieces on the chessboard in their respective turns.
- Game moves are validated to ensure that they follow the standard rules of chess.

### 6. Game Lobby:
- Players can enter a game lobby to find other players or create custom matches.
- The lobby displays available games, player ratings, and other relevant details.

### 7. Match History and Statistics:
- Users can view their match history, including won, lost, and drawn games.
- The platform provides statistics such as win rate, total number of games played, and ELO rating.

## Technologies Used:
- **Backend**: 
  - **Node.js** powers the server, handling real-time communication and game state management.
  - **Express.js** is used for routing and serving the web application, ensuring the platform is scalable and modular.
  
- **Frontend**: 
  - The frontend is built with HTML, CSS, and JavaScript, providing an intuitive user interface for seamless gameplay and navigation.
  
- **Real-Time Communication**: 
  - **Socket.IO** is integrated to manage real-time communication, handling player connections, move synchronization, and game updates instantly.

## Setup and Installation:

### Prerequisites:
- [Node.js](https://nodejs.org/) (for the backend)
- A modern web browser (for frontend)

### Steps to Run:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository-url
   cd chess-game-platform
