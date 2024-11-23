const playArea = document.getElementById("area");
let cols = "abcdefgh"
let allCells = []
let availableCells = []
let curTurn = "white"
let opp = "black"
let pieces = {"white":
    // white pieces
    [["rook", "a1"],
    ["knight", "b1"],
    ["bishop", "c1"],
    ["queen", "d1"],
    ["king", "e1"],
    ["bishop", "f1"],
    ["knight", "g1"],
    ["rook", "d4"],
   
    // ["pawn", "a2"],
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
                // identifies the piece on the space
                resetBoard()
                whatsThatPiece(this.id)
                console.log(this.id)
            })
            allCells.push(cell)
            row.appendChild(cell)
        }
        board.appendChild(row)
    }
    return board;
};


function whatsThatPiece(cell) {
    for (let i = 0; i < pieces[curTurn].length; i++) { // checks every piece in the piece dictionary
        if (pieces[curTurn][i][1] == cell) {
            if (pieces[curTurn][i][0] == "rook") {
                rook(cell)
            } if (pieces[curTurn][i][0] == "pawn") {
                pawn(cell)
            }
        }
    }   
}





function pawn(cell) {
    let moveCell
    // eat enemy piece first if
    if (cell[1] == "2") {
        moveCell = cell[0] + (parseInt(cell[1]) + 1)
        collisions(moveCell)
        moveCell = cell[0] + (parseInt(cell[1]) + 2)
        collisions(moveCell)
    } else if (cell[1] == "7") {
        moveCell = cell[0] + (parseInt(cell[1]) - 1)
        collisions(moveCell)
        moveCell = cell[0] + (parseInt(cell[1]) - 2)
        collisions(moveCell)
    }

    // normal movement
    moveCell = cell[0] + (parseInt(cell[1]) + 1)
    collisions(moveCell)
}


function rook(cell) {
    let moveCell = cell
    while (true) {
        moveCell = moveCell[0] + (parseInt(moveCell[1]) + 1)
        if (collisions(moveCell)) {
            break
        }
    } 

    moveCell = cell
    while (true) {
        moveCell = moveCell[0] + (parseInt(moveCell[1]) - 1)
        if (collisions(moveCell)) {
            break
        }
    } 
    
    moveCell = cell
    while (true) {
        moveCell = cols[cols.indexOf(moveCell[0]) + 1] + moveCell[1]
        if (collisions(moveCell)) {
            break
        }
    }

    moveCell = cell
    while (true) {
        moveCell = cols[cols.indexOf(moveCell[0]) - 1] + moveCell[1]
        if (collisions(moveCell)) {
            break
        }
    }
}


function collisions(cell) {
    for (let i = 0; i < pieces[curTurn].length; i++) { // if it runs into another piece
        if (cell == pieces[curTurn][i][1]) {
            return true
        }
    }
    for (let i = 0; i < pieces[opp].length; i++) { // if it runs into an opponents piece it turns the square red
        if (cell == pieces[opp][i][1]) {
            document.getElementById(cell).style.backgroundColor = "rgb(255, 0, 0)"
            return true
        }
    }
    // else push the cells
    // puts the cells that are available for move in a list
    availableCells.push(cell)
    try {
        document.getElementById(cell).style.backgroundColor = "rgb(255, 255, 0)"
    } catch {
        console.error()
    }
    return false
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


// OLD INITIATION CODE
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

// OLD PIECES OBJECTS
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

// OLD ROOK CODE 
// function rook(cell) {
//     // puts the cells that are available for move in a list
//     let moveCell
//     // vertical movement
//     for (let i = 1; i < 9; i++) {
//         moveCell = document.getElementById(`${cell[0]}${i}`)
//         if (collisions(moveCell)) { // if collisions returns True the loop will break 
//             break
//         }
//     }
//     // horizontal movement
//     for (let i = 0; i < 8; i++) {    
//         moveCell = document.getElementById(`${cols[i]}${cell[1]}`)
//         if (collisions(moveCell)) { // if collisions returns True the loop will break 
//             break
//         }
//     }
//     movePiece()
// }

// OLD MOVE PIECE CODE
// function movePiece() {    
//     // changes available move cells yellow
//     for (let pendCellInd = 0; 0 < availableCells.length; pendCellInd++) {
//         availableCells[pendCellInd].style.backgroundColor = "rgb(255, 255, 0)"
//     }    
// }

// POTENTIAL BISHOP CODE
// while (true) {
//     moveCell = cols[cols.indexOf(moveCell[0]) - 1] + moveCell[1]
//     moveCell = moveCell[0] + (parseInt(moveCell[1]) + 1)
//     if (collisions(moveCell)) {
//         break
//     }
// }