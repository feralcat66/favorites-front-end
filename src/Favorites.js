import React, { Component } from 'react';
import List from './List.js';
import request from 'superagent'

export default class Favorites extends Component {
    state= {
        favorites: []
    }
    componentDidMount = async () => {
        const faves = await request.get('https://protected-savannah-71251.herokuapp.com/api/me/favorites')
        .set('Authorization', this.props.user.token);

        this.setState({ favorites: faves.body })
    }

    render() {
        return (
            <div>
            <List pokemon={ this.state.favorites }/>
        </div>
        )
    }
}