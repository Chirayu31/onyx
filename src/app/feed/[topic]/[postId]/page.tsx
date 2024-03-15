import Nav from "@/components/nav/Nav";
import Comment from "@/components/post/Comment";
import Post from "@/components/post/Post";
import { Input } from "@/components/ui/input";
import React from "react";

const PostPage = () => {
  return (
    <>
      <Nav />

      <main className="flex pt-4 justify-center bg-gray-100">
        <div className="  flex flex-col items-center top-0 w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] min-h-screen  ">
          <Post />
          <form className="flex w-full max-w-auto my-2 gap-2  items-center">
            <Input
              className="h-20 bg-white"
              type="email"
              placeholder="Add a comment"
            />
          </form>
          <Comment />
        </div>
      </main>
    </>
  );
};

export default PostPage;
