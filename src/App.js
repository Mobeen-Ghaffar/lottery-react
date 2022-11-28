import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'
// import { lotteryContract, web3 } from './services';
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
  }, [])

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>This Contract is managed by {manager}</p>
    </div>
  );
}

export default App;
