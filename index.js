const playArea = document.getElementById("area");
let cols = "abcdefgh"
let allCells = []
let availableCells = []
let curTurn = "white"
let pieces = {"white":
    // white pieces
    [["rook", "a1"],
    ["knight", "b1"],
    ["bishop", "c1"],
    ["queen", "d1"],
    ["king", "e1"],
    ["bishop", "f1"],
    ["knight", "g1"],
    ["rook", "h1"],
   
    ["pawn", "a2"],
    ["pawn", "b2"],
    ["pawn", "c2"],
    ["pawn", "d2"],
    ["pawn", "e2"],
    ["pawn", "f2"],
    ["pawn", "g2"],
    ["pawn", "h2"]],
   
    "black":
    // black pieces
    [["rook", "a8"],
    ["knight", "b8"],
    ["bishop", "c8"],
    ["queen", "d8"],
    ["king", "e8"],
    ["bishop", "f8"],
    ["knight", "g8"],
    ["rook", "h8"],
   
    ["pawn", "a7"],
    ["pawn", "b7"],
    ["pawn", "c7"],
    ["pawn", "d7"],
    ["pawn", "e7"],
    ["pawn", "f7"],
    ["pawn", "g7"],
    ["pawn", "h7"]]
}




function gameBoard(){
    // for indetifying columns
    // define the play area
    let board = document.createElement("table")
    // formats the table
    board.style.borderSpacing = "0px"
    board.style.border = "15px solid black"
    // define the spaces
    for (let i = 8; i > 0; i--) {
        let row = document.createElement("tr");
        for (let a = 0; a < 8; a++) {
            let cell = document.createElement("td");
            // gives each space its own id
            cell.id = `${cols[a]}${i}`
            // makes them squares
            cell.style.height = "50px"
            cell.style.width = "50px"
            // checks for clicks on every space
            // gives them color depending on the location
            if ((a + i) % 2 != 0) { // smart
                cell.style.backgroundColor = "rgb(20, 220, 0)"
            } else {
                cell.style.backgroundColor = "rgb(255, 255, 255)"
            }
            cell.addEventListener("click", function() {
                // might be redundant {
                // if (curTurn == "white") {
                //     availableCells.push()
                // } if (curTurn == "black") {
                //     availableCells.push()
                // }
                // }


                // identifies the piece on the space
                resetBoard()
                whatsThatPiece(this.id)
                console.log(availableCells)
            })
            allCells.push(cell)
            row.appendChild(cell)
        }
        board.appendChild(row)
    }
    return board;
};

for (let i = 0; i < pieces.white.length; i++) {
    // if ("a1" in pieces.white[i]) {
        console.log(pieces.white[i])
    // }
}

function whatsThatPiece(cell) {
    for (let i = 0; i < pieces.curTurn.length; i++) {
        if (pieces[curTurn][i][1] == cell) {
            if (pieces.curTurn[i][0] == "rook") {
                rook(cell)
            }
        }
    }
    
    
}








function movePiece() {    
    // changes available move cells yellow
    for (let pendCellInd = 0; 0 < availableCells.length; pendCellInd++) {
        availableCells[pendCellInd].style.backgroundColor = "rgb(255, 255, 0)"
    }
    
}








function rook(cell) {
    // puts the cells that are available for move in a list
    for (let i = 1; i < 9; i++) {
        let moveCell = document.getElementById(`${cell[0]}${i}`)
        availableCells.push(moveCell)
        moveCell = document.getElementById(`${cols[i-1]}${cell[1]}`)
        availableCells.push(moveCell)
        console.log(availableCells)
    }
    movePiece()
}


 // resets the chessboard pattern and the available cells
function resetBoard() {
    availableCells = []
    for (let i = 8; i > 0; i--) {
        for (let a = 0; a < 8; a++) {
            let cell = document.getElementById(`${cols[a]}${i}`)
            if ((a + i) % 2 != 0) { // smart
                cell.style.backgroundColor = "rgb(20, 220, 0)"
            } else {
                cell.style.backgroundColor = "rgb(255, 255, 255)"
            }
        }
    }
}






playArea.appendChild(gameBoard())


// let testButton = document.createElement("button")
// testButton.textContent = "TEST"
// playArea.appendChild(testButton)




// document.addEventListener("load", function(){
    //     let board = document.createElement("table")
//     for (let a = 0; a < 8; a++) {
//         let row = document.createElement("tr");
//         for (let i = 1; i < 9; i++) {
//             let cell = document.createElement("td");
//             cell.id = `${cols[a]}${i}`
//             row.appendChild(cell)
//         }
//         board.appendChild(row)
//     }
//     playArea.appendChild(board)
// });


// let pieces = {"white":
//     // white pieces
//     [{"rook1": "a1"},
//     {"knight1": "b1"},
//     {"bishop1": "c1"},
//     {"queen": "d1"},
//     {"king": "e1"},
//     {"bishop2": "f1"},
//     {"knight2": "g1"},
//     {"rook2": "h1"},


//     {"pawn1": "a2"},
//     {"pawn2": "b2"},
//     {"pawn3": "c2"},
//     {"pawn4": "d2"},
//     {"pawn5": "e2"},
//     {"pawn6": "f2"},
//     {"pawn7": "g2"},
//     {"pawn8": "h2"}],
   
//     "black":
//     // black pieces
//     [{"rook1": "a8"},
//     {"knight1": "b8"},
//     {"bishop1": "c8"},
//     {"queen": "d8"},
//     {"king": "e8"},
//     {"bishop2": "f8"},
//     {"knight2": "g8"},
//     {"rook2": "h8"},
   
//     {"pawn1": "a7"},
//     {"pawn2": "b7"},
//     {"pawn3": "c7"},
//     {"pawn4": "d7"},
//     {"pawn5": "e7"},
//     {"pawn6": "f7"},
//     {"pawn7": "g7"},
//     {"pawn8": "h7"}]
// }
