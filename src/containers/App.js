import React, { Component } from 'react'
import CardList from '../components/CardList'
// import { robots } from './robots'; not needed after we want to fetch from another website
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';


class App extends Component {
	constructor(){
		super()
		this.state = {
			robots : [],
			searchfield: ''
		}
	}


	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()).then(users => {this.setState({robots: users})});
		
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value })
	}


	render() {
		const filteredRobots = this.state.robots.filter(robot =>{
			return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());

		})


		if (this.state.robots.length === 0 ) {  //i.e if the fetch is taking quite a while to get data and robots array is still empty
			return <h1>Loading</h1> 
		}
		else {									//else return out normal initial rendering. Just remove the if and else if robot data is local.
			return (
			<div className="tc">
				<h1 className="f1">RoboFriends</h1>
				<SearchBox searchChange={this.onSearchChange}/>
				<Scroll>
					<CardList robots={filteredRobots}/>
				</Scroll>
			</div>
		);
		}

		
	}
	

}

export default App;