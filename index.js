const playArea = document.getElementById("area");
// to call ids
let cols = "abcdefgh"
// contains all 64 spaces on the board, used when generating the piece images
let allCells = []
// used to store the last clicked viable space
let currentCell
let availableCells
let threatCells
// possible king moves
let kingPoss
let kingThreat
// checks if the kings are being threatened
let whiteInCheck
let blackInCheck
let curTurn
let opp
let pieces


function main() {
    availableCells = []
    threatCells = []
    kingPoss = {
        "white":[],
        "black":[]
    }
    kingThreat = {
        "white":[],
        "black":[]
    }
    whiteInCheck = false
    blackInCheck = false
    curTurn = "white"
    opp = "black"
    pieces = {
        "white":
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

    playArea.appendChild(gameBoard())

    for (let i = 0; i < allCells.length; i++) {
        generatePieces(allCells[i])
    }
}


function gameBoard(){
    // for indetifying columns
    // define the play area
    let board = document.createElement("table")
    board.id = "theBoard"
    // formats the table
    board.style.borderSpacing = "1px"
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
            allCells.push(cell.id) // refer to the comment when the variable is initialized
            cell.addEventListener("click", function() {
                console.log(cell.id)
                // movement code
                if (availableCells.indexOf(cell.id) >= 0) {
                    move(currentCell, this.id)
                } else if (threatCells.indexOf(cell.id) >= 0) {
                    endGame()
                    kill(this.id)
                }
                resetBoard()
                // identifies the piece on the space
                whatsThatPiece(this.id)
            })
            row.appendChild(cell)
        }
        board.appendChild(row)
    }
    return board;
};


function whatsThatPiece(cell) {
    currentCell = cell
    for (let i = 0; i < pieces[curTurn].length; i++) { // checks every piece in the piece dictionary
        // only check what the piece is if the currently sellected cell is the second object of i list in the current turn object of pieces
        if (pieces[curTurn][i][1] == cell) {
            if (pieces[curTurn][i][0] == "pawn") {
                pawn(cell)
            } if (pieces[curTurn][i][0] == "rook") {
                rook(cell)
            } if (pieces[curTurn][i][0] == "bishop") {
                bishop(cell)
            } if (pieces[curTurn][i][0] == "queen") {
                queen(cell)
            } if (pieces[curTurn][i][0] == "knight") {
                knight(cell)
            } if (pieces[curTurn][i][0] == "king") {
                kingBullshit()
                king()
            }
        }
    }
}


function pawn(cell) {
    // defines possible eatable pieces for pawns
    let leftThreat
    let rightThreat
    let moveCell

    if (curTurn == "white") {
        leftThreat = `${cols[cols.indexOf(cell[0]) - 1]}${parseInt(cell[1]) + 1}`
        rightThreat = `${cols[cols.indexOf(cell[0]) + 1]}${parseInt(cell[1]) + 1}`
    } if (curTurn == "black") {
        leftThreat = `${cols[cols.indexOf(cell[0]) - 1]}${parseInt(cell[1]) - 1}`
        rightThreat = `${cols[cols.indexOf(cell[0]) + 1]}${parseInt(cell[1]) - 1}`
    }

    for (let i = 0; i < pieces[opp].length; i++) {
    // eat enemy piece first if
        if (leftThreat == pieces[opp][i][1]) {
            document.getElementById(leftThreat).style.backgroundColor = "rgb(255, 0, 0)"
            threatCells.push(leftThreat)
        } if (rightThreat == pieces[opp][i][1]) {
            document.getElementById(rightThreat).style.backgroundColor = "rgb(255, 0, 0)"
            threatCells.push(rightThreat)
        } 
    }
    
    
    // initial movement
    if (cell[1] == "2" && curTurn == "white") {
        moveCell = cell[0] + (parseInt(cell[1]) + 1)
        if (pawnCollisions(moveCell)) {
            return
        }
        moveCell = cell[0] + (parseInt(cell[1]) + 2)
        if (pawnCollisions(moveCell)) {
            return
        }
    } else if (cell[1] == "7" && curTurn == "black") {
        moveCell = cell[0] + (parseInt(cell[1]) - 1)
        if (pawnCollisions(moveCell)) {
            return
        }
        moveCell = cell[0] + (parseInt(cell[1]) - 2)
        if (pawnCollisions(moveCell)) {
            return
        }
    }
    
    // normal movement
    if (curTurn == "white") {
        moveCell = cell[0] + (parseInt(cell[1]) + 1)
    } if (curTurn == "black") {
        moveCell = cell[0] + (parseInt(cell[1]) - 1)
    }
    
    if (pawnCollisions(moveCell)) {
        return
    }

    // i forgor WIP
    for (let i = 0; i < pieces[curTurn].length; i++) {
        if (cell[1] == "8" && curTurn == "white") {
            if (pieces[curTurn][i][1] == cell) {
                pieces[curTurn][i][0] = "queen"
            }
        
        } else if (cell[1] == "1" && curTurn == "black") {
            if (pieces[curTurn][i][1] == cell) {
                pieces[curTurn][i][0] = "queen"
            }   
        }
    }
}


function rook(cell) {
    let moveCell
    for (let i = parseInt(cell[1]) + 1; i != 9; i++) {
        moveCell = cell[0] + i
        if (collisions(moveCell)) {
            break
        }
    }
    
    for (let i = parseInt(cell[1]) - 1; i != 0; i--) {
        moveCell = cell[0] + i
        if (collisions(moveCell)) {
            break
        }
    }
    
    for (let i = cols.indexOf(cell[0]) + 1; i != 8; i++) {
        moveCell = cols[i] + cell[1]
        if (collisions(moveCell)) {
            break
        }
    }

    for (let i = cols.indexOf(cell[0]) - 1; i != -1; i--) {
        moveCell = cols[i] + cell[1]
        if (collisions(moveCell)) {
            break
        }
    }
}


function bishop(cell) {
    let moveCell
    let o = cols.indexOf(cell[0]) + 1 // when going left
    for (let i = parseInt(cell[1]) + 1; o < 8 || i < 9; i++) {  // when going up
        moveCell = cols[o] + i
        o++
        if (collisions(moveCell)) {
            break
        }
    }
    
    o = cols.indexOf(cell[0]) + 1 // when going left
    for (let i = parseInt(cell[1]) - 1; o < 8 || i > -1; i--) {  // when going down
        moveCell = cols[o] + i
        o++
        if (collisions(moveCell)) {
            break
        }
    }

    o = cols.indexOf(cell[0]) - 1 // when going right
    for (let i = parseInt(cell[1]) - 1; o > 0 || i > -1; i--) { // when going down
        moveCell = cols[o] + i
        o--
        if (collisions(moveCell)) {
            break
        }
    }
    
    o = cols.indexOf(cell[0]) - 1 // when going right
    for (let i = parseInt(cell[1]) + 1; o > 0 || i < 9; i++) { // when going up
        moveCell = cols[o] + i
        o--
        if (collisions(moveCell)) {
            break
        }
    }
}

// easy
function queen(cell) {
    rook(cell)
    bishop(cell)
}


function knight(cell) {
    let moveCell
    // man i wish there was an easier way to do this
    moveCell = cols[cols.indexOf(cell[0]) + 2] + (parseInt(cell[1]) + 1)
    collisions(moveCell)

    moveCell = cols[cols.indexOf(cell[0]) - 2] + (parseInt(cell[1]) + 1)
    collisions(moveCell)

    moveCell = cols[cols.indexOf(cell[0]) + 2] + (parseInt(cell[1]) - 1)
    collisions(moveCell)

    moveCell = cols[cols.indexOf(cell[0]) - 2] + (parseInt(cell[1]) - 1)
    collisions(moveCell)

    moveCell = cols[cols.indexOf(cell[0]) + 1] + (parseInt(cell[1]) + 2)
    collisions(moveCell)

    moveCell = cols[cols.indexOf(cell[0]) - 1] + (parseInt(cell[1]) + 2)
    collisions(moveCell)

    moveCell = cols[cols.indexOf(cell[0]) + 1] + (parseInt(cell[1]) - 2)
    collisions(moveCell)

    moveCell = cols[cols.indexOf(cell[0]) - 1] + (parseInt(cell[1]) - 2)
    collisions(moveCell)
}


function king() {
    for (let i = 0; i < kingPoss[curTurn].length; i++) {
        collisions(kingPoss[curTurn][i])
    }
}

function kingBullshit() {
    let moveCell
    kingPoss[curTurn] = []
    // man i wish there was an easier way to do this
    for (let i = 0; i < pieces[curTurn].length; i++) {
        if (pieces[curTurn][i][0] == "king") {
            moveCell = cols[cols.indexOf(pieces[curTurn][i][1][0]) - 1] + pieces[curTurn][i][1][1]
            kingPoss[curTurn].push(moveCell)
            
            moveCell = cols[cols.indexOf(pieces[curTurn][i][1][0]) + 1] + pieces[curTurn][i][1][1]
            kingPoss[curTurn].push(moveCell)

            moveCell = pieces[curTurn][i][1][0] + (parseInt(pieces[curTurn][i][1][1]) - 1)
            kingPoss[curTurn].push(moveCell)

            moveCell = pieces[curTurn][i][1][0] + (parseInt(pieces[curTurn][i][1][1]) + 1)
            kingPoss[curTurn].push(moveCell)
            
            moveCell = cols[cols.indexOf(pieces[curTurn][i][1][0]) - 1] + (parseInt(pieces[curTurn][i][1][1]) + 1)
            kingPoss[curTurn].push(moveCell)
            
            moveCell = cols[cols.indexOf(pieces[curTurn][i][1][0]) + 1] + (parseInt(pieces[curTurn][i][1][1]) + 1)
            kingPoss[curTurn].push(moveCell)

            moveCell = cols[cols.indexOf(pieces[curTurn][i][1][0]) - 1] + (parseInt(pieces[curTurn][i][1][1]) - 1)
            kingPoss[curTurn].push(moveCell)
            
            moveCell = cols[cols.indexOf(pieces[curTurn][i][1][0]) + 1] + (parseInt(pieces[curTurn][i][1][1]) - 1)
            kingPoss[curTurn].push(moveCell)
        }
    }
    console.log(kingPoss)
}

// enemy capture code is handled locally in its function
function pawnCollisions(cell) {
    for (let i = 0; i < pieces[curTurn].length; i++) { // if it runs into an allied piece
        if (cell == pieces[curTurn][i][1]) {
            return true
        }
    }

    for (let i = 0; i < pieces[opp].length; i++) { // if it runs into an allied piece
        if (cell == pieces[opp][i][1]) {
            return true
        }
    }
    
    availableCells.push(cell)
    document.getElementById(cell).style.backgroundColor = "rgb(255, 255, 0)"
    return false
}


function collisions(cell) {
    for (let i = 0; i < pieces[curTurn].length; i++) { // if it runs into an allied piece
        if (cell == pieces[curTurn][i][1]) {
            return true
        }
    }

    for (let o = 0; o < pieces[curTurn].length; o++) {
            for (let i = 0; i < pieces[opp].length; i++) { // if it runs into an opponents piece it turns the square red
                if (cell == pieces[opp][i][1]) {
                    document.getElementById(cell).style.backgroundColor = "rgb(255, 0, 0)"
                    threatCells.push(cell)
                    return true
                }
            }
    }

    // else push the cells
    // puts the cells that are available for move in a list
    availableCells.push(cell)
    // we ball
    try {
        document.getElementById(cell).style.backgroundColor = "rgb(255, 255, 0)"
    } catch {
        console.error()
    }
    return false
}


function kill(cell) {
    for (let i = 0; i < pieces[opp].length; i++) {
        if (pieces[opp][i][1] == cell) {
            pieces[opp][i] = ""
        }
    }
    move(currentCell, cell)
} 


function move(fromCell, toCell) {
    for (let i = 0; i < pieces[curTurn].length; i++) {
        if (pieces[curTurn][i][1] == fromCell){
            pieces[curTurn][i][1] = toCell
        }
    }
    
    
    generatePieces(toCell)
    document.getElementById(fromCell).innerHTML = ""
    
    switch (curTurn){
        case "white":
            curTurn = "black"
            opp = "white"
            break
        case "black":
            curTurn = "white"
            opp = "black"
            break
        }
}

// resets the chessboard pattern and the available cells
function resetBoard() {
   availableCells = []
   threatCells = []
   currentCell = ""
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


function generatePieces(cell) {
    // man i wish there was an easier way to do this
    let curCell = document.getElementById(cell)
    let whitePieces = "♙♖♗♕♘♔"
    let blackPieces = "♟♜♝♛♞♚"

    for (let i = 0; i < pieces["white"].length; i++) {
        if (pieces["white"][i][1] == cell) {
            if (pieces["white"][i][0] == "pawn") {
                curCell.innerHTML = whitePieces[0]
                curCell.style.fontSize = "230%"
                curCell.style.textAlign = "center"
            } if (pieces["white"][i][0] == "rook") {
                curCell.innerHTML = whitePieces[1]
                curCell.style.fontSize = "230%"
                curCell.style.textAlign = "center"
            } if (pieces["white"][i][0] == "bishop") {
                curCell.innerHTML = whitePieces[2]
                curCell.style.fontSize = "230%"
                curCell.style.textAlign = "center"
            } if (pieces["white"][i][0] == "queen") {
                curCell.innerHTML = whitePieces[3]
                curCell.style.fontSize = "230%"
                curCell.style.textAlign = "center"
            } if (pieces["white"][i][0] == "knight") {
                curCell.innerHTML = whitePieces[4]
                curCell.style.fontSize = "230%"
                curCell.style.textAlign = "center"
            } if (pieces["white"][i][0] == "king") {
                curCell.innerHTML = whitePieces[5]
                curCell.style.fontSize = "230%"
                curCell.style.textAlign = "center"
            }
        }
    }

    for (let i = 0; i < pieces["black"].length; i++) {
        if (pieces["black"][i][1] == cell) {
            if (pieces["black"][i][0] == "pawn") {
                curCell.innerHTML = blackPieces[0]
                curCell.style.fontSize = "230%"
                curCell.style.textAlign = "center"
            } if (pieces["black"][i][0] == "rook") {
                curCell. innerHTML = blackPieces[1]
                curCell.style.fontSize = "230%"
                curCell.style.textAlign = "center"
            } if (pieces["black"][i][0] == "bishop") {
                curCell.innerHTML = blackPieces[2]
                curCell.style.fontSize = "230%"
                curCell.style.textAlign = "center"
            } if (pieces["black"][i][0] == "queen") {
                curCell.innerHTML = blackPieces[3]
                curCell.style.fontSize = "230%"
                curCell.style.textAlign = "center"
            } if (pieces["black"][i][0] == "knight") {
                curCell.innerHTML = blackPieces[4]
                curCell.style.fontSize = "230%"
                curCell.style.textAlign = "center"
            } if (pieces["black"][i][0] == "king") {
                curCell.innerHTML = blackPieces[5]
                curCell.style.fontSize = "230%"
                curCell.style.textAlign = "center"
            }
        }
    }
}


function endGame() {
    // let livePieces = []
    // for (let i = 0; i < pieces[curTurn].length; i++) {
    //     livePieces.push(pieces[curTurn][i][0])
    // }

    // console.log(livePieces)
    // if (livePieces.indexOf("king") >= 0) {
    //     alert(`${curTurn} wins`)
    //     restart()
    // }    
}


function restart() {
    playArea.removeChild(playArea.firstChild)
    console.log(playArea.childNodes)
    main()
}



main()

// TEST BUTTON
// let testButton = document.createElement("button")
// testButton.textContent = "TEST"
// playArea.appendChild(testButton)


// OLD INITIATION CODE
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


// OLDEST ROOK CODE 
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


// OLD ROOK CODE
// let moveCell = cell
//     while (true) {
//         moveCell = moveCell[0] + (parseInt(moveCell[1]) + 1)
//         if (collisions(moveCell)) {
//             break
//         }
//     } 

//     moveCell = cell
//     while (true) {
//         moveCell = moveCell[0] + (parseInt(moveCell[1]) - 1)
//         if (collisions(moveCell)) {
//             break
//         }
//     } 
    
//     moveCell = cell
//     while (true) {
//         moveCell = cols[cols.indexOf(moveCell[0]) + 1] + moveCell[1]
//         if (collisions(moveCell)) {
//             break
//         }
//     }

//     moveCell = cell
//     while (true) {
//         moveCell = cols[cols.indexOf(moveCell[0]) - 1] + moveCell[1]
//         if (collisions(moveCell)) {
//             break
//         }
//     }


// OLD MOVE PIECE CODE
// function movePiece() {    
//     // changes available move cells yellow
//     for (let pendCellInd = 0; 0 < availableCells.length; pendCellInd++) {
//         availableCells[pendCellInd].style.backgroundColor = "rgb(255, 255, 0)"
//     }    
// }


// OLD POTENTIAL BISHOP CODE
// while (true) {
//     moveCell = cols[cols.indexOf(moveCell[0]) - 1] + moveCell[1]
//     moveCell = moveCell[0] + (parseInt(moveCell[1]) + 1)
//     if (collisions(moveCell)) {
//         break
//     }
// }

// OLD KING CODE (BEAUTIFUL IN RETROSPECT)
// function king(cell) {
//     let moveCell
//     // man i wish there was an easier way to do this
//     moveCell = cols[cols.indexOf(cell[0]) - 1] + cell[1]
//     collisions(moveCell)
    
//     moveCell = cols[cols.indexOf(cell[0]) + 1] + cell[1]
//     collisions(moveCell)

//     moveCell = cell[0] + (parseInt(cell[1]) - 1)
//     collisions(moveCell)

//     moveCell = cell[0] + (parseInt(cell[1]) + 1)
//     collisions(moveCell)
    
//     moveCell = cols[cols.indexOf(cell[0]) - 1] + (parseInt(cell[1]) + 1)
//     collisions(moveCell)
    
//     moveCell = cols[cols.indexOf(cell[0]) + 1] + (parseInt(cell[1]) + 1)
//     collisions(moveCell)

//     moveCell = cols[cols.indexOf(cell[0]) - 1] + (parseInt(cell[1]) - 1)
//     collisions(moveCell)
    
//     moveCell = cols[cols.indexOf(cell[0]) + 1] + (parseInt(cell[1]) - 1)
//     collisions(moveCell)
// }