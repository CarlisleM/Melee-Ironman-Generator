import React, { Component, MouseEvent } from 'react'
import { render } from 'react-dom'
import charIcons from '../iconsP1'

import ReactDOM from 'react-dom'

import redcross from '../images/x.png'

var toggleVisibility = true

const MarkComplete = () => {
	const [showMarked, setShowMarked] = React.useState(false)

	function onClick() {
		setShowMarked(toggleVisibility)
		toggleVisibility = !toggleVisibility
		console.log(toggleVisibility)
	}

	return (
		<div>
			<input type='submit' value='Mark Complete' onClick={onClick} />
			{showMarked ? <MarkedComplete /> : null}
		</div>
	)
}

const MarkedComplete = () => (
	<div id='results' className='search-results'>
		<img
			src={redcross}
			style={{ height: '112px', width: '128px' }}
			className=''
			alt='logo'
		/>
	</div>
)

function handleClick(characterIcon) {
	tester.forEach((element) => {
		if (element[1] == characterIcon) {
			console.log('positve match for ' + characterIcon)
			element[0] = true
		}
	})
	console.log(tester)
}

export interface PlayerRosterProps {
	characterIcons: string[]
}

var imageData = [
	{
		isComplete: Boolean,
		charImage: Image,
	},
]

var tester = Object.keys(charIcons).map(
	(characterIcon) => (imageData = [false, charIcons[characterIcon]])
)

export function PlayerRoster({ characterIcons }: PlayerRosterProps) {
	console.log(tester[5][1])
	return (
		<div className=''>
			{/* {
                Object.keys(charIcons).map((charIcon) => (
                    <img src={ charIcons[charIcon] } onClick={this.handleClick} className="" alt="logo" />                    
                ))
            } */}

			{/* {Object.keys(charIcons).map(
				(characterIcon) =>
					(data = [
						false,
						charIcons[characterIcon],
						// <img src={charIcons[characterIcon]} className="" alt="logo" />
					])
			)} */}

			{Object.keys(tester).map((characterIcon) => (
				<img
					src={characterIcons[characterIcon]}
					onClick={() => handleClick(characterIcons[characterIcon])}
					className=''
					alt='logo'
				/>
			))}

			<img
				src={redcross}
				style={{ height: '112px', width: '128px' }}
				className=''
				alt='logo'
			/>
			<MarkComplete />
		</div>
	)
}

export default PlayerRoster
