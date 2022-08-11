import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarData from './sidebar-content'
import axios from "axios";

let postType;
const sidebarData = SidebarData();

export default function getPostType() {
    const [searchParams] = useSearchParams();
    const urllocation = useLocation()
    const fullpath = urllocation.pathname.split("/")
    const path = (fullpath[fullpath.length - 1])
    postType = searchParams.get('post_type') ? searchParams.get('post_type') : path;

    return postType;

}

export const getPostId = () => {

    let postId;
    const [searchParams] = useSearchParams();
    const urllocation = useLocation()
    const fullpath = urllocation.pathname.split("/")
    const path = (fullpath[fullpath.length - 1])
    postId = searchParams.get('post') ? searchParams.get('post') : path;

    return postId;
}

export const getPostIdType = (props) => {
    const [post_type, setPostType] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:4000/posts/get-posttype/" + props)
            .then(({ data }) => {
                setPostType(data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [post_type]);
    if(post_type.length > 0){
    return post_type
    } else return 0
}

export const getPostTitles = () => {
    let activecontent;
    return (

        (sidebarData.map((record, i) => {
            for (let [key, value] of Object.entries(record.subtitles)) {
                if ((value.posttype == postType)) {
                    activecontent = value.title
                }
            }

        })) ? activecontent : ''
    );
}

export const getPostTitle = () => {
    let activecontent;
    return (

        (sidebarData.map((record, i) => {
            for (let [key, value] of Object.entries(record.subtitles)) {
                if ((value.posttype == postType)) {
                    activecontent = value.title_singular
                }
            }

        })) ? activecontent : ''
    );
}

export const getPostFields = (props) => {
    const [myJson, setMyJson] = useState([]);
    useEffect(() => {
        if(props){
        fetch('../../../src/plugins/' + props + '.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                setMyJson(myJson)
            })
        }
    }, [props])
    return myJson

}