import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Image } from 'react-native'

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

	render() {
		return (
			<button
				onClick={() =>
					this.setState((prevState) => ({
						status: !prevState.status,
					}))
				}
			>
				<img src={this.props.characterPortrait} alt='css-icon' />
				<div className={this.state.status ? 'show' : 'hide'}>XXX</div>
				{this.state.value}
			</button>
		)
	}
}
