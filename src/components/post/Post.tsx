import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { EyeOpenIcon, HeartIcon } from "@radix-ui/react-icons";
import React from "react";
import { BiComment } from "react-icons/bi";
import Content from "./Content";
import LikesButton from "./LikesButton";
import CommentButton from "./CommentButton";
import ViewsButton from "./ViewsButton";

const Post = () => {
  return (
    <Card className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] h-fit cursor-pointer">
      <CardHeader>
        <div className="flex items-center gap-2">
          <img
            src="https://preview.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=640&crop=smart&auto=webp&s=22ed6cc79cba3013b84967f32726d087e539b699"
            className="w-10 h-10 rounded-full"
          />

          <p className="font-semibold text-zinc-500 text-base">User956</p>
          <p className="text-sm text-zinc-400">12h ago</p>
        </div>
      </CardHeader>
      <CardContent>
        <h2 className="font-bold text-base lg:text-lg">
          My conservative friends are more tolerant than my liberal friends
        </h2>
        <Content />
      </CardContent>
      <CardFooter>
        <div className="flex gap-2">
          <LikesButton />
          <CommentButton />
          <ViewsButton />
        </div>
      </CardFooter>
    </Card>
  );
};

export default Post;
