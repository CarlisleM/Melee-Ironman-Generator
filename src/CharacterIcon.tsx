import React from 'react'
import redcross from './images/x.png'

type AppProps = {
	characterPortrait: any
	rosterSize: number
	playerNumber: number
}

type AppState = {
	isComplete: Boolean
}

let charsCompleteP1 = 0
let charsCompleteP2 = 0

export default class CharacterIcon extends React.Component<AppProps, AppState> {
	constructor(props) {
		super(props)
		this.state = {
			isComplete: false,
		}
	}

	handleClick() {
		// Toggle the characters completion state
		this.setState((prevState) => ({
			isComplete: !prevState.isComplete,
		}))

		// Keep track of how many characters are remaining and check for a winner
		if (this.props.playerNumber == 1) {
			if (this.state.isComplete === true) {
				charsCompleteP1 -= 1
			} else {
				charsCompleteP1 += 1
			}

			if (
				charsCompleteP1 == this.props.rosterSize &&
				charsCompleteP2 != this.props.rosterSize
			) {
				console.log('P1 Winner')
			}
		} else if (this.props.playerNumber == 2) {
			if (this.state.isComplete === true) {
				charsCompleteP2 -= 1
			} else {
				charsCompleteP2 += 1
			}

			if (
				charsCompleteP2 == this.props.rosterSize &&
				charsCompleteP1 != this.props.rosterSize
			) {
				console.log('P2 Winner')
			}
		}
	}

	render() {
		return (
			<button className='character-button' onClick={() => this.handleClick()}>
				<img
					className='character-portrait'
					src={this.props.characterPortrait}
					alt='css-icon'
				/>
				<div className={this.state.isComplete ? 'show' : 'hide'}>
					<img className='mark-complete' src={redcross} alt='complete' />
				</div>
			</button>
		)
	}
}
