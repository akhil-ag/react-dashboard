import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarData from '../resources/js/sidebar-content'
import axios from "axios";

let postTypeUrl;
const sidebarData = SidebarData();
// console.log(sidebarData)

export default function getPostType() {
}

export const getPostTypeUrl = () => {
    let postTypeUrl;
    const [searchParams] = useSearchParams();
    const urllocation = useLocation()
    const fullpath = urllocation.pathname.split("/")
    const path = (fullpath[fullpath.length - 1])
    postTypeUrl = searchParams.get('post_type') ? searchParams.get('post_type') : path;
    return postTypeUrl;
}


export const getPostIdUrl = () => {

    let postIdUrl = 0;
    const [searchParams] = useSearchParams();
    const urllocation = useLocation()
    const fullpath = urllocation.pathname.split("/")
    const path = (fullpath[fullpath.length - 1])
    postIdUrl = searchParams.get('post') ? searchParams.get('post') : path;

    return postIdUrl;
}

export const getPostTypeDb = (props) => {
    const [post_type, setPostType] = useState('accordian');
    useEffect(() => {
        axios
            .get("http://11.0.244.174:4000/posts/get-posttype/" + props)
            .then(({ data }) => {
                setPostType(data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [post_type]);
    return post_type
}

export const getPostTitlesJson = (postType) => {
    let title;
    return (

        (sidebarData.map((record, i) => {
            for (let [key, value] of Object.entries(record.subtitles)) {
                if ((value.posttype == postType)) {
                    title = value.title
                }
            }

        })) ? title : ''
    );
}

export const getPostTitleJson = (postType) => {
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
    }, [props])
    return myJson

}