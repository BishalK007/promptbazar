"use client";

import { SyntheticEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt =  () => {
  const router = useRouter();
  const { data: session } =  useSession();
  const userSession = session as { user: { id: string } | null | undefined };
  // console.log(session);

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const createPrompt = async (event : SyntheticEvent ) => {
    // console.log(session)
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // console.log(`create ${session}`)
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: userSession?.user?.id,
          tag: post.tag,
        }),
      });
      // console.log(response)

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      // console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    session?.user ? 
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    /> : <div>Loading</div>
  );

  
};

export default CreatePrompt;