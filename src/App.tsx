import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './App.css'
import charIconsP1 from './iconsP1'
import charIconsP2 from './iconsP2'

import PlayerRoster from './CharacterRoster/PlayerRoster'
import GenerateRoster from './RandomiseRoster'

import CharacterIcon from './CharacterIcon'
import PlayerRosterTest from './PlayerRoster'

type AppProps = {}

type AppState = {
	playerOneChars: string[]
	playerTwoChars: string[]
}

class App extends React.Component<AppProps, AppState> {
	constructor(props) {
		super(props)

		this.state = {
			playerOneChars: charIconsP1,
			playerTwoChars: charIconsP2,
			// bannedChars: []
			// playerOneBannedChars: [],
			// playerTwoBannedChars: []
		}
	}

	shuffleRoster(roster) {
		var currentIndex = roster.length,
			temporaryValue,
			randomIndex

		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex)
			currentIndex -= 1
			temporaryValue = roster[currentIndex]
			roster[currentIndex] = roster[randomIndex]
			roster[randomIndex] = temporaryValue
		}

		return roster
	}

	shuffleRosterP1(roster) {
		this.setState({
			playerOneChars: this.shuffleRoster(charIconsP1),
			playerTwoChars: this.shuffleRoster(charIconsP2),
		})
	}

	render() {
		return (
			<div className='App'>
				{/* <CharacterIcon /> */}

				<div className='game'>
					<div className='game-board'>
						<PlayerRosterTest />
					</div>
					<div className='game-info'>
						<div>{/* status */}</div>
						<ol>{/* TODO */}</ol>
					</div>
				</div>

				<GenerateRoster changeRoster={this.shuffleRosterP1.bind(this)} />
				<div className='PlayerOne'>
					<h1>Player One Roster</h1>
					<PlayerRoster characterIcons={this.state.playerOneChars} />
				</div>
				<div className='PlayerTwo'>
					<h1>Player Two Roster</h1>
					<PlayerRoster characterIcons={this.state.playerTwoChars} />
				</div>
			</div>
		)
	}
}

export default App
