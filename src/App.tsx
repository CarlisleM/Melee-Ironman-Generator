import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './App.css'
import charIconsP1 from './iconsP1'
import charIconsP2 from './iconsP2'

import GenerateRoster from './RandomiseRoster'

import CharacterIcon from './CharacterIcon'
import PlayerRosterTest from './PlayerRoster'

import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

type AppProps = {}

type AppState = {
	playerOneChars: string[]
	playerTwoChars: string[]
	gameStatus: string
	charRoster: { value: string; label: string }[]
	bannedChars: string[]
	rosterSize: number
}

// Game status
const STATES = {
	IDLE: 'idle',
	INPROGRESS: 'inprogress',
	COMPLETE: 'complete',
}

// See if there is a better way to code this
const rosterLimit = [
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'10',
	'11',
	'12',
	'13',
	'14',
	'15',
	'16',
	'17',
	'18',
	'19',
	'20',
	'21',
	'22',
	'23',
	'24',
	'25',
	'26',
]

const charList = [
	{ value: 'bowser', label: 'Bowser' },
	{ value: 'captainFalcon', label: 'Captain Falcon' },
	{ value: 'donkeyKong', label: 'Donkey Kong' },
	{ value: 'dMario', label: 'Dr Mario' },
	{ value: 'falco', label: 'Falco' },
	{ value: 'fox', label: 'Fox' },
	{ value: 'gameandwatch', label: 'Game & Watch' },
	{ value: 'ganon', label: 'Ganon' },
	{ value: 'iceclimbers', label: 'Ice Climbers' },
	{ value: 'jigglypuff', label: 'Jigglypuff' },
	{ value: 'kirby', label: 'Kirby' },
	{ value: 'link', label: 'Link' },
	{ value: 'luigi', label: 'Luigi' },
	{ value: 'mario', label: 'Mario' },
	{ value: 'marth', label: 'Marth' },
	{ value: 'mewtwo', label: 'Mewtwo' },
	{ value: 'ness', label: 'Ness' },
	{ value: 'peach', label: 'Peach' },
	{ value: 'pichu', label: 'Pichu' },
	{ value: 'pikachu', label: 'Pikachu' },
	{ value: 'roy', label: 'Roy' },
	{ value: 'samus', label: 'Samus' },
	{ value: 'ylink', label: 'Young Link' },
	{ value: 'yoshi', label: 'Yoshi' },
	{ value: 'zelda', label: 'Zelda' },
	{ value: 'sheik', label: 'Sheik' },
]

class App extends React.Component<AppProps, AppState> {
	constructor(props) {
		super(props)

		this.state = {
			playerOneChars: charIconsP1,
			playerTwoChars: charIconsP2,
			gameStatus: STATES.IDLE,
			charRoster: charList,
			bannedChars: [],
			rosterSize: 26,
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

	shuffleRosters(roster) {
		console.log(this.state.playerOneChars)
		this.setState({
			playerOneChars: this.shuffleRoster(charIconsP1).slice(
				0,
				this.state.rosterSize
			),
			playerTwoChars: this.shuffleRoster(charIconsP2).slice(
				0,
				this.state.rosterSize
			),
		})
		console.log(this.state.playerOneChars)

		// Reset all characters here to false maybe
	}

	// Messed up links for these 3
	// Falco
	// Game and watch
	// Yoshi
	// Fix falcon name

	// Ban certain characters from appearing in the roster
	banCharacter = (event) => {
		this.setState({ rosterSize: this.state.rosterSize - 1 }) // Minus one from  roster size
		this.state.bannedChars.push(event.value)

		this.setState({
			playerOneChars: charIconsP1.filter((banned) =>
				this.state.bannedChars.every((val) => !banned.includes(val))
			),
			charRoster: charList.filter((banned) =>
				this.state.bannedChars.every((val) => !banned.value.includes(val))
			),
		})
	}

	setRosterSize = (event) => {
		if (event.value <= 26 - this.state.bannedChars.length) {
			this.setState({
				rosterSize: event.value,
				playerOneChars: charIconsP1.slice(0, event.value),
				playerTwoChars: charIconsP2.slice(0, event.value),
			})
		} else {
			// Impossible roster size given the current number of banned characters

			console.log('Error out here')
		}
	}

	render() {
		return (
			<div className='App'>
				<div className='Options'>
					<Dropdown
						className='rosterSizeSelection'
						options={rosterLimit}
						onChange={this.setRosterSize}
						value={this.state.rosterSize.toString()}
						placeholder='Select an option'
					/>

					<Dropdown
						className='charList'
						options={this.state.charRoster}
						onChange={this.banCharacter}
						value={''}
						placeholder='Select ban char'
					/>

					<div className='GenerateRoster'>
						<GenerateRoster changeRoster={this.shuffleRosters.bind(this)} />
					</div>

					<div>
						{/* <p>{this.state.bannedChars}</p> */}
						{Object.keys(this.state.bannedChars).map((txt) => (
							<p>{this.state.bannedChars[txt]}</p>
						))}
						{/* {this.state.bannedChars.map((txt) => (
							<p>{txt}</p>
						))} */}
					</div>
				</div>

				<div className='Rosters'>
					<h1>Player 1</h1>
					<PlayerRosterTest
						rosterSize={this.state.rosterSize}
						charIcons={this.state.playerOneChars}
						playerNumber={1}
					/>
					<h1>Player 2</h1>
					<PlayerRosterTest
						rosterSize={this.state.rosterSize}
						charIcons={this.state.playerTwoChars}
						playerNumber={2}
					/>
				</div>
			</div>
		)
	}
}

export default App
