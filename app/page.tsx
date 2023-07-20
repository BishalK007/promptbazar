import React from 'react'
import Feed from '@components/Feed'



const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Discover and Share{" "}
            <br className="md:hidden" />
            
            <span className="blue_gradient text-center">AI Prompts</span>
        </h1>
        <p className="desc text-center">
        "Discover endless creative possibilities with PROMPY - the AI-powered prompts archive. 
        Unleash your imagination and
         kickstart your writing, art, or any other project with prompts made by the community."
        </p>
        {/* */
         /*__________________________ Feed   ______________________ */
         /* */}   
        <Feed />

    </section>
  )
}

export default Home