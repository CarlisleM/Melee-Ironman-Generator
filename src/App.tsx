import React from 'react'
import './App.css'
import charIconsP1 from './iconsP1'
import charIconsP2 from './iconsP2'

import GenerateRoster from './RandomiseRoster'

import PlayerRoster from './PlayerRoster'

import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

import bfbg from './images/bfbg.jpg'

type AppProps = {}

type AppState = {
	playerOneChars: string[]
	playerTwoChars: string[]
	charRoster: { value: string; label: string }[]
	bannedChars: string[]
	rosterSize: number
	gameStatus: string
	rosterOptions: string
}

// Game status
const STATES = {
	IDLE: 'idle',
	INPROGRESS: 'inprogress',
	COMPLETE: 'complete',
}

// Set roster size options
var rosterLimit: string[] = []

for (var i = 1; i < 27; i++) {
	rosterLimit.push(String(i))
}

const charList = [
	{ value: 'bowser', label: 'Bowser' },
	{ value: 'captainfalcon', label: 'Captain Falcon' },
	{ value: 'donkeykong', label: 'Donkey Kong' },
	{ value: 'drmario', label: 'Dr Mario' },
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

// If roster size smaller than 26, and less bans than roster size - bans, add radio button option for wether players want to force their rosters to be the same characters or use different (randomised)

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
			rosterOptions: 'random-rosters',
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

	filterArray = (arr1, arr2) => {
		const filtered = arr1.filter((el) => {
			if (arr1 == charList) {
				return arr2.indexOf(el.value) === -1
			} else {
				return arr2.indexOf(el.split('/')[3].split('.')[0]) === -1
			}
		})
		return filtered
	}

	shuffleRosters(rosterP1, rosterP2) {
		if (this.state.rosterOptions == 'random-rosters') {
			this.setState({
				playerOneChars: this.shuffle(
					this.filterArray(rosterP1, this.state.bannedChars)
				).slice(0, this.state.rosterSize),
				playerTwoChars: this.shuffle(
					this.filterArray(rosterP2, this.state.bannedChars)
				).slice(0, this.state.rosterSize),
			})
		} else {
			var charRandom = this.shuffle(charIconsP1)
			this.setState({
				playerOneChars: this.shuffle(
					this.filterArray(charRandom, this.state.bannedChars).slice(
						0,
						this.state.rosterSize
					)
				),
				playerTwoChars: this.shuffle(
					this.filterArray(charRandom, this.state.bannedChars).slice(
						0,
						this.state.rosterSize
					)
				),
			})
		}
		// Reset all characters here to false maybe
	}

	// Ban certain characters from appearing in the roster
	banCharacter = (event) => {
		// This is never entered, check what this actually does
		if (this.state.rosterSize > 26 - this.state.bannedChars.length) {
			this.setState({ rosterSize: this.state.rosterSize - 1 }) // Minus one from  roster size
		}

		this.state.bannedChars.push(event.value)

		this.setState({
			playerOneChars: this.filterArray(
				charIconsP1,
				this.state.bannedChars
			).slice(0, this.state.rosterSize),
			playerTwoChars: this.filterArray(
				charIconsP2,
				this.state.bannedChars
			).slice(0, this.state.rosterSize),
			charRoster: this.filterArray(charList, this.state.bannedChars),
		})
	}

	unbanChar = (text) => {
		var num
		this.state.bannedChars.forEach((element, idx) => {
			if (element.includes(text)) {
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
			this.setState({
				rosterSize: event.value,
				// charIconsP1 should be this.state.playerOneChars, this makes banned chars not appear when randomised, but causes the roster to not be able to be made bigger

				playerOneChars: this.shuffle(
					charIconsP1
						.filter((banned) =>
							this.state.bannedChars.every((val) => !banned.includes(val))
						)
						.slice(0, event.value)
				),

				playerTwoChars: this.shuffle(
					charIconsP2
						.filter((banned) =>
							this.state.bannedChars.every((val) => !banned.includes(val))
						)
						.slice(0, event.value)
				),
			})
		} else {
			alert(
				'Impossible roster size given the current number of banned characters'
			)
		}
	}

	onValueChange = (event) => {
		this.setState({
			rosterOptions: event.target.value,
		})
	}

	render() {
		return (
			<div
				className='App'
				style={{
					backgroundImage: 'url(' + bfbg + ')',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
					backgroundSize: 'cover',
				}}
			>
				<div className='Options'>
					<h1>Options</h1>
					<div className='GenerateRoster'>
						<GenerateRoster
							changeRoster={this.shuffleRosters.bind(
								this,
								charIconsP1,
								charIconsP2
							)}
						/>
					</div>
					<div className='ChooseMatchRosters'>
						<div className='radio-button'>
							<input
								type='radio'
								value='match-rosters'
								name='roster'
								checked={this.state.rosterOptions === 'match-rosters'}
								onChange={this.onValueChange}
							/>{' '}
							Same Chars
						</div>
						<div className='radio-button'>
							<input
								type='radio'
								value='random-rosters'
								name='roster'
								checked={this.state.rosterOptions === 'random-rosters'}
								onChange={this.onValueChange}
							/>{' '}
							Random Chars
						</div>
					</div>

					<div className='roster-size'>
						Roster Size:
						<Dropdown
							className='rosterSizeSelection'
							options={rosterLimit}
							onChange={this.setRosterSize}
							value={this.state.rosterSize.toString()}
							placeholder='Select an option'
						/>
					</div>

					<Dropdown
						className='charList'
						options={this.state.charRoster}
						onChange={this.banCharacter}
						value={''}
						placeholder='Select ban char'
					/>
					<div className='banList'>
						<h1>Banned</h1>
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
