import React, { Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';

class Posts extends Component {
  state = {
    posts: [],
  }

	componentDidMount () {
    axios.get('/posts') 
    	.then(response => {
				// console.log(response)
				const posts = response.data.slice(0,4);
				const updatedPosts = posts.map(post => {
					return {
						...post,
						author: 'Yan'
					}
				})
				this.setState({posts: updatedPosts})
    	});
    }
    
  postSelectedHandler= (id) => {
    this.setState({selectedPostId: id})
  }
  render() { 
    const posts = this.state.posts.map(post => {
      return <Post 
        key={post.id} 
        title={post.title} 
        author={post.author}
        clicked={() => this.postSelectedHandler(post.id)}/>
    });
    return ( 
      <section className="Posts">
        {posts}
      </section>
     )
  }
}
 
export default Posts;