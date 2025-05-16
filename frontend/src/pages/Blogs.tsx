import BlogCard from "../Components/BlogCard";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const { loading, data } = useBlogs();

  if (loading) {
    return <>loading...</>;
  }

  console.log(data);
  return (
    <div className="flex justify-center">
      <div className="max-w-xl flex flex-col">
        {data.map((val) => (
          <BlogCard
            id={val.id}
            key={val.title}
            authorName={val.author.name}
            title={val.title}
            content={val.content}
            publish_date={new Date(val.publish_date).toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
