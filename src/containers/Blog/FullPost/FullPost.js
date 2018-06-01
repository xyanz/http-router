import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        currentPost: null
    }

    componentDidMount () {
        console.log('[FullPost.js]', this.props.match)
        if(this.props.match.params.id) {
            if (!this.state.currentPost || (this.state.currentPost && this.state.currentPost.id !== this.props.id)) {
                axios.get('/posts/' + this.props.match.params.id)
                    .then(response => {
                        // console.log(response);
                        this.setState({currentPost: response.data})
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    }
    deletePostHandler = (id) => {
        axios.delete('/posts/' + id)
            .then(response => {
                console.log(response)
            })
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if(this.props.id) {
            post = <p style={{textAlign: 'center'}}>Loading...</p>;
            }
        if(this.state.currentPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.currentPost.title} </h1>
                    <p>{this.state.currentPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={() => this.deletePostHandler(this.props.id)}>Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;