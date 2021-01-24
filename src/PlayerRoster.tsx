import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import CharacterIcon from './CharacterIcon'
// import charIconsP1 from './iconsP1'

interface AppProps {
	charIcons: any
	rosterSize: number
	playerNumber: number
}

export default class PlayerRoster extends React.Component<AppProps> {
	renderIcons(i, charImage) {
		return (
			<CharacterIcon
				rosterSize={this.props.rosterSize}
				characterPortrait={charImage}
				playerNumber={this.props.playerNumber}
			/>
		)
	}

	render() {
		return (
			<div className=''>
				{Object.keys(this.props.charIcons).map((characterIcon, idx) => (
					<div className='PlayerRoster'>
						{this.renderIcons(idx, this.props.charIcons[idx])}
						{/* This is weird, characterIcon should give the same as charIconsP1[idx] */}
					</div>
				))}
			</div>
		)
	}
}
