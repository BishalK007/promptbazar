'use client'
import { useState, useEffect } from 'react'
import PromptCard from './PromptCard';


type PromptCardListProps = {
  data: Array<any>;
  handleTagClick: () => void;
};

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}

        />
      ))}
    </div>
  )
}
export default function Feed() {
  const [searchText, setSearchText] = useState('');
  const [posts, setposts] = useState([])


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchText(newValue);
  }
  const handleSearchSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      // Call your desired function here
      // For example, you can call a search function
      performSearch();
    }
  };

  const performSearch = async () => {
    // console.log(`Performing search for: ${searchText}`);
    const response = await fetch(`/api/search`, {
      method: 'POST',
      body: JSON.stringify({
        queryString: searchText
      })
    });
      const data = await response.json();
      console.log(data);
      setposts(data);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/prompt`);
      const data = await response.json();
      console.log(data);
      setposts(data);
    }
    fetchPosts();
  }, [])


  return (

    <section className='feed'>
      <form action="" className="reletive w-full flex-center">
        {/* */
         /*__________________________ SearchBar  ______________________ */
         /* */}
        <input type="text"
          placeholder= 'search for tag or post'
          value={searchText}
          onChange={handleSearchChange}
          onKeyDown={handleSearchSubmit}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList
        data={posts}
        handleTagClick={() => { }}

      />
    </section>
  );
}




