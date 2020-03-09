import React, { Component } from 'react';
import List from './List.js';
import request from 'superagent';


export default class Search extends Component {
    state = { 
        pokemon: [],
        favorites: [],
        input: '',
    }

 
    componentDidMount = async () => {
        const faves = await request.get('https://protected-savannah-71251.herokuapp.com/api/me/favorites')
        .set('Authorization', this.props.user.token);


        // fetch faves on mount to decide whether to put a star or a make favorite button
        this.setState({ favorites: faves.body })
    }

    handleSearch = async (e) => {
        e.preventDefault();

        // set loading state
        this.setState({ loading: true });
        const data = await request.get(`https://protected-savannah-71251.herokuapp.com/api/pokedex?search=${this.state.input}`)
        .set('Authorization', this.props.user.token);

        // when the user clicks search, hit your search endpoint and set the results in state (and kill the loading state).
        this.setState({
            pokemon: data.body,
            loading: false
        });
    }

    render() {

        return (
            <div>
                {/* on submit, call the handlSearch function */}
                <form onSubmit={this.handleSearch}>
                {/* on change, update the input in state */}
                <input value={this.state.input} onChange={(e) => this.setState({ input: e.target.value })} />
                {/* disable the button if loading */}
                <button className="search-btn"disabled={this.state.loading}>Search!</button>
                </form>
                {
                    // if loading, show loading, else, show list
                    this.state.loading 
                    ? "loading!!"
                    : <List 
                    pokemon={this.state.pokemon} 
                    favorites={this.state.favorites}
                    user={this.props.user} />

                }
            </div>
        )
    }
}