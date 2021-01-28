import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './App.css'
import charIconsP1 from './iconsP1'
import charIconsP2 from './iconsP2'

import GenerateRoster from './RandomiseRoster'

import CharacterIcon from './CharacterIcon'
import PlayerRoster from './PlayerRoster'

import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { DebugInstructions } from 'react-native/Libraries/NewAppScreen'
import { debug } from 'console'

type AppProps = {}

type AppState = {
	playerOneChars: string[]
	playerTwoChars: string[]
	charRoster: { value: string; label: string }[]
	bannedChars: string[]
	rosterSize: number
	gameStatus: string
}

// Game status
const STATES = {
	IDLE: 'idle',
	INPROGRESS: 'inprogress',
	COMPLETE: 'complete',
}

var rosterLimit: string[] = [];

for (var i = 1; i < 27; i++) {
    rosterLimit.push(String(i));
}

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
			charRoster: charList,
			bannedChars: [],
			rosterSize: 26,
			gameStatus: STATES.IDLE,
		}
	}

	shuffle(roster) {
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

	shuffleRosters(rosterP1, rosterP2) {
		console.log(rosterP1)
		this.setState({
			playerOneChars: this.shuffle(rosterP1)
				.filter((banned) =>
					this.state.bannedChars.every((val) => !banned.includes(val))
				)
				.slice(0, this.state.rosterSize),
			playerTwoChars: this.shuffle(rosterP2)
				.filter((banned) =>
					this.state.bannedChars.every((val) => !banned.includes(val))
				)
				.slice(0, this.state.rosterSize),
		})
		// Reset all characters here to false maybe
	}

	// Messed up links for these 3
	// Falco
	// Game and watch
	// Yoshi
	// Fix falcon name

	// Ban certain characters from appearing in the roster
	banCharacter = (event) => {
		// Banning link bans both ylink and link

		// This is never entered
		if (this.state.rosterSize > 26 - this.state.bannedChars.length) {
			console.log('actually entered this thing')
			this.setState({ rosterSize: this.state.rosterSize - 1 }) // Minus one from  roster size
		}

		this.state.bannedChars.push(event.value)

		this.setState({
			playerOneChars: charIconsP1
				.filter((banned) =>
					this.state.bannedChars.every((val) => !banned.includes(val))
				)
				.slice(0, this.state.rosterSize),
			playerTwoChars: charIconsP2
				.filter((banned) =>
					this.state.bannedChars.every((val) => !banned.includes(val))
				)
				.slice(0, this.state.rosterSize),
			charRoster: charList.filter((banned) =>
				this.state.bannedChars.every((val) => !banned.value.includes(val))
			),
		})
	}

	unbanChar = (text) => {
		// Remove from banned list

		var num

		this.state.bannedChars.forEach((element, idx) => {
			if (element.includes(text)) {
				console.log('found a match: ' + element)
				num = idx
			}
		})

		this.setState({
			charRoster: charList.filter((banned) =>
				this.state.bannedChars.every(
					(val) =>
						!banned.value.includes(val) ||
						banned.value.includes(this.state.bannedChars[num])
				)
			),
		})

		if (num != null) {
			this.state.bannedChars.splice(num, 1)
		}
	}

	setRosterSize = (event) => {
		if (event.value <= 26 - this.state.bannedChars.length) {
			console.log(charIconsP1)
			this.setState({
				rosterSize: event.value,
				// charIconsP1 should be this.state.playerOneChars, this makes banned chars not appear when randomised, but causes the roster to not be able to be made bigger

				playerOneChars: charIconsP1
					.filter((banned) =>
						this.state.bannedChars.every((val) => !banned.includes(val))
					)
					.slice(0, event.value),

				playerTwoChars: charIconsP2.slice(0, event.value),
			})
		} else {
			alert(
				'Impossible roster size given the current number of banned characters'
			)
		}
	}

	render() {
		return (
			<div className='App'>
				<div className='Options'>
					<div className='GenerateRoster'>
						<GenerateRoster
							changeRoster={this.shuffleRosters.bind(
								this,
								charIconsP1,
								this.state.playerTwoChars
							)}
						/>
					</div>

					<Dropdown
						className='rosterSizeSelection'
						options= {rosterLimit}
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

					<div>
						{Object.keys(this.state.bannedChars).map((txt) => (
							<p onClick={() => this.unbanChar(this.state.bannedChars[txt])}>
								{this.state.bannedChars[txt]}
							</p>
						))}
					</div>
				</div>

				<div className='Rosters'>
					<h1>Player 1</h1>
					<PlayerRoster
						rosterSize={this.state.rosterSize}
						charIcons={this.state.playerOneChars}
						playerNumber={1}
					/>
					<h1>Player 2</h1>
					<PlayerRoster
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
