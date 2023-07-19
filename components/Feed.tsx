'use client'
import {useState, useEffect} from 'react'
import PromptCard from './PromptCard';

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard 
        key = {post._id}
        post = {post}
        handleTagClick = {handleTagClick}

        />
      ))}
    </div>
  )
}
export default function Feed() {
  const [searchText, setSearchText] = useState('');
  const [posts, setposts] = useState([])
  const handleSearchChange = (event) => {
    
  }
  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      // console.log(data);
      setposts(data);
    }
    fetchPosts();
  },[])


  return(
    // <div>
    //   FEED
    // </div>
    <section className='feed'>
      <form action="" className="reletive w-full flex-center">
        <input type="text" 
        placeholder='search for tag or username'
        value={searchText} 
        onChange={handleSearchChange} 
        required 
        className='search_input peer'
        />

      </form>
      <PromptCardList 
        data = {posts}
        handleTagClick = {() => {}}

        />
    </section>
  );
}




