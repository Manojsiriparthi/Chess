//socket is used to real time communication
const express =require("express");
const socket =require("socket.io");
const http =require("http");
const {Chess} = require("chess.js")

const path =require("path");

const app =express();

const server =http.createServer(app);//hmlog http server ko express.js ke server se connect krte hai
 
const io =socket(server);

const chess = new Chess();//all rules of chess comes in chess variable
let players ={};
let currentPlayer ="w";

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    res.render("index",{title:"Chess Game"});
})
//functionality of socket.io
//socket.io ko frontend aur backend dono pr chal rha tab connect hota hai
io.on("connection",function(uniquesocket){
    console.log("connected");
    //jab bhi uniquesocket se churan aaye yah socket chala dena
    //jab frontend se churan aayega backend pr 
    //then backend se churan paddpadi in frontend parts
    //when i received churan from frontend to backend then sends churan paddpadi to all frontend which is show in console
    // uniquesocket.on("churan",function(){
    //     //if churan received from frontend then it secnd churan in frontend
    //     io.emit("churan paddpadi");
    // });
    //if close the browser or any way disconnect the connection the send disconnected
    // uniquesocket.on("disconnect",function(){
    //     console.log("disconnect");
    // })
    //check all time if new user come to play chess by default white is present or not if not then make
    if(!players.white){
        players.white = uniquesocket.id;
        uniquesocket.emit("playerRole","w");
    } else if (!players.black){
        players.black = uniquesocket.id;
        uniquesocket.emit("playerRole","b");
        //if both are not presnt then you become spectatorRole
    }else{
        uniquesocket.emit("spectatorRole");
    } 
    // if any banda disconnect from like players.white or players.black then you can delete thier id.
    uniquesocket.on("disconnect",function(){
        if(uniquesocket.id === players.white){
            delete players.white;
        }else if(uniquesocket.id === players.black){
            delete players.black;
        }
    });
    uniquesocket.on("move",(move)=>{
        //it below code means black ke time black chalega aur white se samay white chalega
        try{
            if(chess.turn() === "w" && uniquesocket.id !== players.white) return;
            if(chess.turn() === "b" && uniquesocket.id !== players.black) return;
//check correct move in chess
            const result = chess.move(move);
            if(result){
                currentPlayer =chess.turn();
                io.emit("move",move);
                io.emit("boardState",chess.fen());//fen help to find current location in chess board
            }
            else{
                console.log("Invalid move:",move);
                uniquesocket.emit("move");//it show invalid moment in chess to send message which user run fault move
            }

        } catch(err){
            console.log(err);
            uniquesocket.emit("Invalid move :",move);

        }
    });
});

server.listen(3000,()=>{
    console.log("server chal rha hai 3000 port pr");
});