import { useParams } from 'react-router-dom';
import { useBlog } from '../hooks';

const Blog = () => {
  const { id } = useParams<{ id: string }>(); // ✅ extract the id string
  const { blogData, blogLoading } = useBlog(id ?? ""); // ✅ pass just the string

  if (!id) return <div>Error: Blog ID not found in URL</div>;
  if (blogLoading) return <div>Loading...</div>;
  if (!blogData) return <div>No blog found</div>;

  return (
    <div>
      <h1>{blogData.title }</h1>
      <p>{blogData.content}</p>
      <p>By {blogData.author.name}</p>
      <p>
        Published on{" "}
        {new Date(blogData.publish_date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </p>
    </div>
  );
};

export default Blog;
