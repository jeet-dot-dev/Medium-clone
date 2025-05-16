import axios from "axios";
import { useEffect, useState } from "react";
const url = import.meta.env.VITE_BASE_URL;

interface Data {
  id: string;
  author: { name: string };
  title: string;
  content: string;
  publish_date: string;
}

// hooks for fetching a single blog
export const useBlog = (id: string) => {
  const [blogData, setBlogData] = useState<Data[]>();
  const [blogLoading, SetBlogLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDataByID = async () => {
      try {
        const res = await axios.get(`${url}/api/v1/blog/${id}`);
        setBlogData(res.data.post);
        SetBlogLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataByID();
  }, [id]);
  return { blogData, blogLoading };
};

// hooks for fetching all the blogs
export const useBlogs = () => {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${url}/api/v1/blog/bulk`);
        setData(res.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });

  return { data, loading };
};
