'use client'
import {useState, useEffect} from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from "@components/Profile";

interface Post {
  _id: string; // Assuming '_id' is of type string, change it accordingly if needed
  // Other properties of the 'post' object go here
}

export default function MyProfile() {
  const router = useRouter();
  const { data: session } = useSession();
  const userSession = session as { user: { id: string } | null | undefined };

  const [myPosts, setMyPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userSession?.user?.id}/posts`);
      const data = await response.json();
      console.log(data)

      setMyPosts(data);
    };

    if (userSession?.user?.id) fetchPosts();
  }, [userSession?.user?.id]);

  const handleEdit = (post : Post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post : Post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};