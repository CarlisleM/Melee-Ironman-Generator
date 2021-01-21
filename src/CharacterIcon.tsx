import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Image } from 'react-native'
import redcross from './images/x.png'

type AppProps = {
	characterPortrait: any
}

type AppState = {
	value: any
	status: Boolean
	character: String
}

export default class CharacterIcon extends React.Component<AppProps, AppState> {
	constructor(props) {
		super(props)
		this.state = {
			value: null,
			status: false,
			character: '',
		}
	}

	handleClick() {
		this.setState((prevState) => ({
			status: !prevState.status,
		}))

		const characters = [true, true, false]

		// If all characters are complete, return true
		if (characters.every((element) => element === true)) {
			console.log('passed')
			return true
		} else {
			console.log('failed')
		}
	}

	render() {
		return (
			<button className='CharacterButton' onClick={() => this.handleClick()}>
				<img
					className='CharacterPortrait'
					src={this.props.characterPortrait}
					alt='css-icon'
				/>
				<div className={this.state.status ? 'show' : 'hide'}>
					<img className='MarkComplete' src={redcross} alt='css-icon' />
				</div>
				{this.state.value}
			</button>
		)
	}
}
