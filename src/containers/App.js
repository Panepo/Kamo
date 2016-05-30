import React, { Component } from 'react'
import Header from './Header'
import Drawer from './Drawer'
import Content from './Content'

//import '../../css/App.css'

export default class App extends Component {
	render() {
		return (
			<div>
				<div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
					<Header />
					<Drawer />
					<Content />
				</div>
			</div>
		)
	}
}
