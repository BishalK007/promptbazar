import Link from "next/link"
import '@styles/globals.css'

export default function Form({type, post, setPost, submitting, handleSubmit}:{type:String}) {
  return(
    <section className="w-full max-w-full flex-start flex-col">
        <h1 className="head_text text-left">
            <span className="blue_gradient">
            {type} Post
            </span>
        </h1>
        <p className="desc text-lext max-w-md">
        {type} and Share Your Next Masterpiece with AI-Powered Inspiration
        </p>
        <form className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
            {/* */
             /*__________________________ Prompt Title  ______________________ */
             /* */}
            
            <label htmlFor="">
                <span className="font-satisfy font-semibold text-base text-grey-700" >
                    Your AI Prompt
                </span>
                <textarea value={post.prompt} onChange={(event) => {
                    setPost({...post, prompt:event.target.value})
                }}
                placeholder="Write Your Prompt Here"
                required
                  className="form_textarea"/>
            </label>
            {/* */
             /*__________________________ Prompt Tag  ______________________ */
             /* */}
            
            <label htmlFor="">
                <span className="font-satisfy font-semibold text-base text-grey-700" >
                    Tag
                    &nbsp;
                    <span className="font-inter">
                        (#WebDev, #idea, #ChatGPT)
                    </span>
                </span>
                <input value={post.tag} onChange={(event) => {
                    setPost({...post, tag:event.target.value})
                }}
                placeholder="#tag"
                required
                  className="form_input"/>
            </label>
            {/* */
             /*__________________________ Buttons  ______________________ */
             /* */}
            
            <div className="flex-end mx-3 mb-5 gap-4">
                <Link className="text-sm-text-grey-500"href="/">
                    Cancel
                </Link>
                <button className="px-5 py-1.5 text-sm rounded-full text-white bg-gradient-to-r from-green-400 to-blue-500">
                    {submitting ? `${type}...` : type}
                </button>
            </div>
        </form>
    </section>
  );
}