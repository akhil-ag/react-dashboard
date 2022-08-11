import React from 'react';
import {useNavigate} from 'react-router-dom';
import Icons from '../../atoms/icons'
import './index.scss'
import axios from "axios";

// import handleOnUpdate from '../../organisms/post'

export default function formSubmit(props) {
    const post_id = props.post_id;
    const values = props.values;
    const post_type = props.post_type;
    const post_title = props.post_title;
    const navigate = useNavigate();

    const handleOnSubmits = async (e) => {
        e.preventDefault();
        for (let [key, value] of Object.entries(values)) {
            let meta_key = key;
            let meta_value = value;
            axios.post(
                'http://localhost:4000/posts/new-post',
                { post_id, meta_key, meta_value })
                .then(res => {
                    if (res.status === 200) {
                        
                        document.getElementsByClassName('content__post-message-val')[0].innerText=post_title+" Created.";
                        document.getElementsByClassName('content__post-message')[0].style.visibility = 'visible'
                        setTimeout(() => {
                            document.getElementsByClassName('content__post-message')[0].style.visibility = 'hidden';
                          }, 2000);
                        // console.log(meta_key + ' - ' + meta_value)
                        // alert("Student successfully updated");
                    }else
                        Promise.reject()
                })
                .catch(err => alert('Something went wrong'))
        }
       
        navigate('/dashboard/post?post='+post_id);
    }


    const handleOnUpdate = async (e) => {
        e.preventDefault();
        console.log(values)
        for (let [key, value] of Object.entries(values)) {
            let meta_key = key;
            let meta_value = value;
            // console.log(meta_key + ' - ' + meta_value)
            axios.put("http://localhost:4000/posts/update-post/" + post_id,
                { meta_key, meta_value }
            )
                .then((res) => {
                    if (res.status === 200) {
                        document.getElementsByClassName('content__post-message-val')[0].innerText=post_title+" Updated.";
                        document.getElementsByClassName('content__post-message')[0].style.visibility = 'visible'
                        setTimeout(() => {
                            document.getElementsByClassName('content__post-message')[0].style.visibility = 'hidden';
                          }, 2000);
                        // console.log(meta_key + ' - ' + meta_value)
                        // alert("Student successfully updated");
                    } else Promise.reject();
                })
            // .catch((err) => alert("Something went wrong"));
        }
    }

    const handleOnDelete = async (e) => {
        e.preventDefault();
        axios.delete("http://localhost:4000/posts/delete-post/" + post_id)
            .then((res) => {
                if (res.status === 200) {
                    // alert("post successfully deleted");
                    // window.location.reload();
                } else Promise.reject();
            })
            .catch((err) => alert("Something went wrong"));
            navigate('/dashboard/edit?post_type='+ post_type);
    }

    return (
        <div className='content__post-section-2'>
            <div className='content__post-header'>
                <label>Publish</label>

            </div>
            <div className='content__post-publish'>
                <div className='content__post-publish-btn--secondary'>
                    {(props.type == 'update') ? <> <button type="submit" className='btn--secondary' onClick={handleOnUpdate}>Update</button>
                        <button type="submit" className='btn--secondary' onClick={handleOnDelete}>Move to trash</button></>
                        : <button type="submit" className='btn--secondary' onClick={handleOnSubmits}>Save Draft</button>}

                </div>
                <div className='publish-actions'>
                    <div className='publish-action-item'>
                        <Icons title="dashicons:post-status" class="publish-action"></Icons> <p>Status: Draft</p>
                    </div>

                </div>
            </div>
        </div>
    );
}