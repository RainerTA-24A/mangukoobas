import React, { useState, useEffect } from 'react'; 
import './Tic.css';

const winningConditions = [
    //Horisontaalne (read)
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    // Vertikaalne (veerud)
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    // Diagonaalne
    [0, 4, 8], [2, 4, 6],
];

// ABI FUNKTSIOON: leiab juhusliku käigu
const findRandomMove = (board) => {
    // 1. Leia kõik tühjad ruudud
    const emptyCells = [];
    board.forEach((cell, index) => {
        if (cell === '') {
            emptyCells.push(index);
        }
    });

    // 2. Vali juhuslikult üks tühja ruudu indeks
    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[randomIndex];
    }
    return -1; // Kui käiku pole
};

function TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(''));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [isGameActive, setIsGameActive] = useState(true);
    const [statusMessage, setStatusMessage] = useState("Sinu (X) käik!");
    const [isHumanTurn, setIsHumanTurn] = useState(true); // UUS: Kas inimene teeb käigu

    //  useEffect - käivitatakse iga kord, kui on AI kord ('O')
    useEffect(() => {
        // Kontrolli, kas mäng on aktiivne ja on AI kord ('O')
        if (!isHumanTurn && isGameActive && currentPlayer === 'O') {
            // Viivitus 500ms, et käik ei toimuks kohe ja tunduks loomulikum
            const timer = setTimeout(() => {
                handleAIMove(board);
            }, 500); // 0.5 sekundiline viivitus

            // Puhastusfunktsioon
            return () => clearTimeout(timer); 
        }
    }, [isHumanTurn, isGameActive, currentPlayer, board]); // Sõltuvused

    // FUNKTSIOON 1 -- TULEMUSE KONTROLL (Muudetud, et võtaks argumendiks player'i)
    const checkResult = (currentBoard, player) => {
        let roundWon = false;

        for (let i = 0; i < 8; i++) {
            const [a, b, c] = winningConditions[i];

            if (currentBoard[a] === '' || currentBoard[b] === '' || currentBoard[c] === '') {
                continue;
            }

            if (currentBoard[a] === currentBoard[b] && currentBoard[b] === currentBoard[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            setStatusMessage(`VÕITJA on ${player}! 🎉`);
            setIsGameActive(false);
            return true;
        }
        
        if (!currentBoard.includes('')) {
            setStatusMessage('Viik! Mäng on läbi!');
            setIsGameActive(false);
            return true;
        }
        return false;
    };


    // FUNKTSIOON 2 -- INIMESE KÄIK
    const handleHumanMove = (index) => {
        // Kontrolli, kas käik on lubatud ja kas on inimese kord
        if (board[index] !== '' || !isGameActive || !isHumanTurn) {
            return;
        }

        const newBoard = [...board];
        newBoard[index] = currentPlayer; // Inimene on alati 'X'
        setBoard(newBoard);

        // Kontrollime tulemust. Kui võitu ei tulnud, anname kord üle AI-le.
        if (!checkResult(newBoard, currentPlayer)) {
            setCurrentPlayer('O'); // Järgmine mängija on O (AI)
            setStatusMessage(`Arvuti käik...`);
            setIsHumanTurn(false); // Anna kord üle AI-le
        }
    };
    
    // UUS FUNKTSIOON 3 -- ARVUTI KÄIK
    const handleAIMove = (currentBoard) => {
        const moveIndex = findRandomMove(currentBoard);

        if (moveIndex !== -1) {
            const newBoard = [...currentBoard];
            newBoard[moveIndex] = 'O'; // AI on alati 'O'
            setBoard(newBoard);

            // Kontrollime tulemust. Kui võitu ei tulnud, anname kord tagasi inimesele.
            if (!checkResult(newBoard, 'O')) {
                setCurrentPlayer('X'); // Järgmine mängija on X (Inimene)
                setStatusMessage(`Sinu (X) käik!`);
                setIsHumanTurn(true); // Anna kord tagasi inimesele
            }
        }
    };

    // FUNKTSIOON 4 -- LÄHTESTAMINE
    function resetGame () {
        setBoard(Array(9).fill(''));
        setCurrentPlayer('X'); 
        setIsGameActive(true);
        setStatusMessage("Sinu (X) käik!"); // Algteade
        setIsHumanTurn(true); // Alati alustab inimene
    }

    // RENDER
    return (
        <div className = "tic-tac-toe-game">
            <h2>Trips-Traps-Trull</h2>
            <div className="status">{statusMessage}</div>
            <div className="board">
                {board.map((cell, index) => (
                    <div
                    key={index}
                    className = "cell"
                    // Kasutame handleHumanMove
                    onClick={() => handleHumanMove(index)}
                    // Näitame hoverit ainult siis, kui on inimese kord
                    data-hover={cell === '' && isHumanTurn ? currentPlayer : ''} 
                    >
                        {cell}
                    </div>
                ))}
            </div>
                <button onClick={resetGame}>Alusta uuesti</button>
        </div>
    );
}

export default TicTacToe;