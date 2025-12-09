import react, {useState} from 'react';
import './Tic.css';

const winningConditions = [
    //Horisontaalne (read)
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Vertikaalne (read)
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonaalne
    [0, 4, 8],
    [2, 4, 6],
];

function TicTacToe() {
    // Mängulaua seisund (9 tühja stringi)
    const [board, setBoard] = useState(Array(9).fill(''));
    // Praegune mängija ('X' või 'O')
    const [currentPlayer, setCurrentPlayer] = useState('X');
    // Mängu olek (kas mäng käib)
    const [isGameActive, setIsGameActive] = useState(true);
    // Mängu tulemuse teade
    const [statusMessage, setStatusMessage] = useState("Mängija X käik");

    // FUNKTSIOON 1 -- KÄIGU TEGEMINE   

    //kontrollime esmalt, kas käik on lubatud:
    // Kas ruut on juba täidetud (board[index] !== '')
    // Kas mäng on juba läbi (isGameActive === false)

    const handleCellClick = (index) => {
      if (board[index] !== '' || !isGameActive) {
        return
      }

      // Uus lauaseisund, kuna reactis ei tohi vanu osariike otse muuta.
      const newBoard = [...board];
      newBoard[index] = currentPlayer;

      // Uuendame Reacti boardi uue laua seisuga
      setBoard(newBoard);

      // Kontrolli, kas kõik tõi võidu või viigi
      if(checkResult(newBoard)){
        return;
      }
      // Vahetame mängijat
      const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
      setCurrentPlayer(nextPlayer)
      setStatusMessage(`Mängija ${nextPlayer} käik!`);
    };

    // FUNKTSIOON 2 -- TULEMUSE KONTROLL (sinu loogika rakendus)
    const checkResult = (currentBoard) => {
        let roundWon = false;

        // Tsükkel käib läbi kõik 8 võidu tingimust.
        for (let i = 0; i < 8; i++) {
            const winCondition = winningConditions[i];

            const a = currentBoard[winCondition[0]];
            const b = currentBoard[winCondition[1]];
            const c = currentBoard[winCondition[2]];

            // Kui üks ruut on tühi, ei saa see olla võiduliin
            if (a === '' || b === '' || c === '') {
                continue;
            }

            // Kui kõik 3 ruutu on samad (X või O), siis võit
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            setStatusMessage(`VÕITJA on ${currentPlayer}! 🎉`);
            setIsGameActive(false);
            return true;
        }
        //Kui lauamäng on täis ja võitu ei tulnud siis viik
        if (!currentBoard.includes('')) {
            setStatusMessage('Viik! Mäng on läbi!');
            setIsGameActive(false);
            return true;
        }
        return false;
    };

    // RENDER
    return (
        <div className = "tic-tac-toe-game">
            <h2>Trips-Traps-Trull</h2>
            <div className="status">{statusMessage}</div>
            <div className="board">
                {board.map((cell, index) => (
                    // map funktsioon kordab massivi (board) elemente ja loob ruudud. 
                    <div
                    key={index}
                    className = "cell"
                    onClick={() => handleCellClick(index)}
                    data-hover={cell === '' ? currentPlayer : ''}
                    >
                        {cell}
                    </div>
                ))}
            </div>
                {/* Siia võid lisada nuppu mängu lähtestamiseks */}
                {/*<button onClick={resetGame}>Alusta uuesti </button> */}
        </div>
    );
}

export default TicTacToe;