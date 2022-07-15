import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

export default function values() {
    return 0
}


export const getPostData = (post_type) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:4000/posts/get-postlist/" + post_type)
            .then(({ data }) => {
                setPosts(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [post_type]);

    return posts;
}

