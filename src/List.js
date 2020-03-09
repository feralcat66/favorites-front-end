import React, { Component } from 'react';
import request from 'superagent';
import { withRouter } from 'react-router-dom';

// we need withRouter to get access to the URL to see if we are on the favorites page
export default withRouter(class List extends Component {
    /* whenever youre in a list and clicking on an item has a function that needs access to that item, you need a function that returns a function*/
    makeFavorite = async (poke) => {
        console.log('List', this.props.favorites)
        // when the user clicks the makeFavorite button, add this character to the favorite list
        const fave = await request.post('https://protected-savannah-71251.herokuapp.com/api/me/favorites', {
            pokemon: poke.pokemon,
            type_1: poke.type_1,
            base_experience: poke.base_experience,
            url_image: poke.url_image
        })
        .set('Authorization', this.props.user.token)

        console.log('fave', fave.body)
    }
    
    renderButtonOrStar = (poke) => {
        // check the favorites list if we're on the search page
        const isOnFavoritesList = this.props.favorites.find(pok => pok.name === poke.name);
        if (!isOnFavoritesList) {
            // if they're not on the list, give user option to add them to favorites
            // we are iterarting through a list, and we need the item in a function, so we make an anonymous function that CALLS that function on click with the right arguments
        return <button className="fav-btn"onClick={ (e) => this.makeFavorite(poke)}>Make favorite</button>
        }

        // otherwise, indicate that they ae already on the favorites list
        return <span>⭐</span>
    }
    render() {
        console.log(this.props.favorites);
        return (
            <div>
                {
                      this.props.pokemon.map(poke => <div key={poke.name} className="poke-box">
                          <h2>{poke.pokemon}</h2>
                          <p>{poke.type_1}</p>
                          <p>{poke.base_experience}</p>
                          <img src={poke.url_image} alt=""></img>
                          {
                            this.props.location.pathname !== '/favorites' 
                            // only render a button or star on the search page
                                && this.renderButtonOrStar(poke)
                        }
                  </div>)
                }
            </div>
        )
    }
});