import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'
import web3 from './web3';
import lottery from './lottery';
function App() {

  const [manager, setManager] = useState('')
  const [players, setPlayers] = useState([])
  const [balance, setBalance] = useState('') // Note: balance is not a number - it's an object (wrapped in a library called BignumberJS)
  const [value, setValue] = useState('')
  const [message, setMessage] = useState('')
  const getManager = async () => {
    // Don't need to set from argument because we're using the Metamask provider
    const manager = await lottery.methods.manager().call()
    console.log(manager);
    const players = await lottery.methods.getPlayers().call()
    const balance = await web3.eth.getBalance(lottery.options.address)
    setManager(manager)
    setPlayers(players)
    setBalance(balance)
  }
  useEffect(() => {
    getManager()
  }, []);
  let onSubmit = async (event) => {
    event.preventDefault();
    setMessage("Waiting on transaction sucesss...");

    const accounts = await web3.eth.getAccounts();
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, 'ether')
    });
    setMessage("You have been entered!");
  };
  let onClick = async () => {
    const accounts = await web3.eth.getAccounts();
    setMessage("Waiting on transaction sucesss...");
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });
    setMessage("A winner has picked!");

  }

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>This Contract is managed by {manager}
        There are currently {players.length} people entered,
        competing to win {web3.utils.fromWei(balance, 'ether')} ethers!
      </p>
      <hr />
      <form onSubmit={onSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input value={value} onChange={event => setValue(event.target.value)} />

        </div>
        <button>Enter</button>
      </form>
      <hr />
      <h4>Ready to pick a winner?</h4>
      <button onClick={onClick}>Pick a winner!</button>
      <hr />
      <h1>{message}</h1>
    </div>
  );
}

export default App;
