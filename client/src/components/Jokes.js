import React, { Component } from 'react';
import axios from 'axios';

export default class Jokes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false, 
            jokes: [],
        }
    }

    authenticate = () => {
        const token = localStorage.getItem('my_token');
        const options = {
            headers: {
                Authorization: token
            }
        }

        if (token) {
            axios.get('http://localhost:3300/api/jokes', options)
                .then(res => {
                    if(res.status === 200 && res.data) {
                        this.setState({loggedIn: true, jokes: res.data})
                    } else {
                        throw new Error();
                    }
                })
                .catch(err => {
                    this.props.history.push('/login')
                })
        } else {
            this.props.history.push('/login')
        }
    }

    componentDidMount() {
        this.authenticate()
    }

    componentDidUpdate(prevProps) {
        const { pathname } = this.props.location;
        if (pathname === '/' && pathname !== prevProps.location.pathname) {
          this.authenticate();
        }
    }

    logout = () => {
        localStorage.removeItem('my_token')
        this.props.history.push('/Login')
    }

    render() {
        return (
            <div>
                <button onClick={this.logout}>Logout</button>
                <h1>Jokes</h1>
                <section className='Joke_boxs'>
                    {this.state.jokes.map(joke => 
                        <section key={joke.id} className='joke_box'>
                            <h3>{`Type: ${joke.type}`}</h3>
                            <h4>{`${joke.setup}`}</h4>
                            <h5>{`${joke.punchline}`}</h5>
                        </section>
                    )}
                </section>
            </div>
        )
    }

}