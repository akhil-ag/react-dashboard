import React from 'react';
import {useNavigate} from 'react-router-dom';
import Icons from '../../atoms/icons'
import './index.scss'
import axios from "axios";

// import handleOnUpdate from '../../organisms/post'

export default function formSubmit(props) {
    const navigate = useNavigate();
    const handleOnUpdate = async (e) => {
        e.preventDefault();
        for (let [key, value] of Object.entries(props.values)) {
            let meta_key = key;
            let meta_value = value;
            // console.log(meta_key + ' - ' + meta_value)
            axios.put("http://11.0.244.174:4000/posts/update-post/" + props.post_id,
                { meta_key, meta_value }
            )
                .then((res) => {
                    if (res.status === 200) {
                        console.log(meta_key + ' - ' + meta_value)
                        // alert("Student successfully updated");
                    } else Promise.reject();
                })
            // .catch((err) => alert("Something went wrong"));
        }
    }

    const handleOnDelete = async (e) => {
        e.preventDefault();
        axios.delete("http://11.0.244.174:4000/posts/delete-post/" + props.post_id)
            .then((res) => {
                if (res.status === 200) {
                    // alert("post successfully deleted");
                    // window.location.reload();
                } else Promise.reject();
            })
            .catch((err) => alert("Something went wrong"));
            navigate('/dashboard/edit?post_type='+props.post_type);
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
                        : <button type="submit" className='btn--secondary'>Save Draft</button>}

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