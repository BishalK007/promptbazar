'use client'

import {useState} from 'react'
import Image from 'next/image'
import {useSession} from 'next-auth/react'
import { usePathname, useRouter} from 'next/navigation'

type PromptCardProps = {
  post: any;
  handleTagClick: any;
  handleEdit?: any;
  handleDelete?: any;
}


export default function PromptCard({post, handleTagClick, handleEdit, handleDelete} : PromptCardProps) {

  const [copied, setCopied] = useState('')
  const { data: session } = useSession()
  const userSession = session as { user: { id: string } | null | undefined };
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = async () => {
      navigator.clipboard.writeText(post.prompt);
      await setCopied(post._id);
      // console.log(copied)
      // console.log(post._id)
      // console.log(post._id === copied)
      setTimeout(() => 
        setCopied(''),
        3000
      )
  }

  return(
    <div className='prompt_card'>
      <div className="flex justify-between items start gap-5">
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          {/* */
           /*__________________________ Post Image  ______________________ */
           /* */}  
          <Image 
            src={post.creator?.image || '/assets/images/profile.png'}
            alt='User Image'
            height = {40}
            width={40}
            className='rounded-full object-contain'
          />
          <div className="flex flex-col">
            {/* */
             /*__________________________ Post Creator Username  ______________________ */
             /* */}
            <h3 className='font-semibold text-gray-900'>
              {post.creator?.username || 'Deleted User'}
            </h3>

            {/* */
             /*__________________________ Post Creator Email  ______________________ */
             /* */}
            
            <p className='text-sm text-gray-500'>
              {post.creator?.email || ''}
            </p>
            
          </div>
        </div>
        {/* */
             /*__________________________ Copy Button  ______________________ */
             /* */}
            <div className="copy_btn" onClick={handleCopy}>
              <Image 
                alt='copy button'
                src={
                  copied == post._id
                    ? 'assets/icons/tick.svg' 
                    : 'assets/icons/copy.svg'
                  }
                width={12}
                height={12}
              />
            </div>
      </div>
      {/* */
       /*__________________________ Prompt Text  ______________________ */
       /* */}
      <p className="my-4 text-sm text-grey-700">
        {post.prompt}
      </p>
      {/* */
       /*__________________________ Prompt Tag  ______________________ */
       /* */}
      <p className="text-sm blue_gradient cursor-pointer" 
      onClick={()=>handleTagClick && handleTagClick(post.tag)}>
        {post.tag}
      </p>
      {/* */
       /*__________________________ In Profile Page, Edit AND DELETE  ______________________ */
       /* */}
      {userSession?.user?.id === post.creator?._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
}