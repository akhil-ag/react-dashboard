import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

export default function values(props) {
    return 0
}


export const getPostId = () => {

    let postIdUrl = 0;
    const [searchParams] = useSearchParams();
    const urllocation = useLocation()
    const fullpath = urllocation.pathname.split("/")
    const path = (fullpath[fullpath.length - 1])
    postIdUrl = searchParams.get('post') ? searchParams.get('post') : path;

    return postIdUrl;
}

export const getPostType=(props)=> {
    const [post_type, setPostType] = useState('');
    useEffect(() => {
        axios
            .get("http://localhost:4000/posts/get-posttype/" + props)
            .then(({ data }) => {
                setPostType(data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [props, post_type]);
    return post_type
}

export const getFormValues=(post_id)=> {
    const [formValues, setFormValues] = useState([]);

    useEffect(() => {
        axios
          .get(
            "http://localhost:4000/posts/update-post/" 
            + post_id
          )
          .then((res) => {
            setFormValues(res.data);
          })
          .catch((err) => console.log(err));
      }, [post_id]);
      return formValues
}

