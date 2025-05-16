import { Bookmark } from "lucide-react";
import { Ellipsis } from "lucide-react";
import { CircleMinus } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publish_date: string;
}

const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publish_date,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="flex flex-col p-5 gap-1 ">
        <div className="flex justify-start gap-2 items-center text-sm">
          <Avatar name={authorName} />
          <span className="font-semibold">{authorName} . </span>
          <span className="font-extralight text-sm"> {publish_date}</span>
        </div>
        <div className="font-bold mt-2 cursor-pointer">{title}</div>
        <div className="text-[#666666]">
          {content.length > 100 ? `${content.slice(0, 100)} ....` : content}
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-[#818181] text-sm">
            {`${Math.ceil(content.length / 100)} min read`}
          </div>
          <div className="flex text-[#a9a9a9] space-x-2">
            <Bookmark className="w-5 h-5 cursor-pointer hover:text-black" />
            <CircleMinus className="w-5 h-5 cursor-pointer hover:text-black" />
            <Ellipsis className="w-5 h-5 cursor-pointer hover:text-black" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export function Avatar({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden  bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {name?.charAt(0).toUpperCase() || "?"}
      </span>
    </div>
  );
}

export default BlogCard;
