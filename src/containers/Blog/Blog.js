import React, { Component } from 'react';
// import axios from 'axios';
import './Blog.css';
import axios from '../../axios';
import Posts from '../Blog/Posts/Posts';
import FullPost from '../Blog/FullPost/FullPost';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
// import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';
const AsyncNewPost = asyncComponent(() => {
	return import('./NewPost/NewPost');
});



class Blog extends Component {

    render () {
        return (
            <div className="Blog">
				<header>
					<nav>
						<ul>
							<li><NavLink to="/" exact>Home</NavLink></li>
							<li><NavLink to={{
								pathname: "/new-post",
								hash: "#submit",
								search: "?quick-submit=true"
							}}>New Post</NavLink></li>
						</ul>
					</nav>
				</header>
				<Route path="/" exact component={Posts}/>
				<Switch>
					{this.state.auth ? <Route path="/new-post" component={AsyncNewPost}/> : null}
					
					<Route path="/:id" exact component={FullPost}/>	
					{/* <Redirect from="/" to="/posts" /> */}
					<Route render={() => <h1>Not found</h1>} />
				</Switch>
            </div>
        );
    }
}

export default Blog;