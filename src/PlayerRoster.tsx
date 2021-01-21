import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import CharacterIcon from './CharacterIcon'

import charIconsP1 from './iconsP1'

export default class PlayerRoster extends React.Component {
	renderIcons(i, charImage) {
		return <CharacterIcon characterPortrait={charImage} />
	}

	render() {
		return (
			<div className=''>
				{Object.keys(charIconsP1).map((characterIcon, idx) => (
					<div className='PlayerRoster'>
						{this.renderIcons(idx, charIconsP1[idx])}{' '}
						{/* This is weird, characterIcon should give the same as charIconsP1[idx] */}
					</div>
				))}
			</div>
		)
	}
}
