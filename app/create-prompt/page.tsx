'use client'
import {useState} from 'react'
import {useSession} from 'next-auth/react'
import {useRouter} from 'next/navigation'
import Form from '@components/Form'

export default function CreatePrompt() {
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt:'',
    tag:'',
  })
  const CreatePrompt = async (event) => {
    //To make sure that browser default does not reload
    event.preventDefault();
    setSubmitting(true);

    try {
        
    } catch (error) {
        
    }

  }
    return(
    <Form 
        type= "Create"
        post = {post}
        setPost = {setPost}
        submitting = {submitting}
        handleSubmit = {CreatePrompt}
    />
  );
} 