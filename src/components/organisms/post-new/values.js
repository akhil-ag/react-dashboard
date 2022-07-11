import { useState, useEffect } from "react";
import axios from "axios";

let postType;

export default function values() {
    return 0

}

export const getPostId=(props)=> {
    const [post_id, setPostId] = useState(1);
    useEffect(() => {
        axios
            .get("http://11.0.244.174:4000/posts/get-postid")
            .then(({ data }) => {
                setPostId(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [props, post_id]);
    return post_id

}
