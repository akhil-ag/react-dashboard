import React, { useEffect, useState, setLoading } from 'react';
import {useNavigate} from 'react-router-dom';
import { getPostFields } from '../../../resources/js/getPostType'
import './index.scss'
import Links from '../../atoms/links';
import Fields from '../../atoms/fields';
import axios from "axios";
import {getPostId} from './values';
import FormSubmit from '../../molecules/formSubmit'

function NewPost(props) {
    const navigate = useNavigate();
    const data = getPostFields(props.type)
    const [values, setValues] = useState({});

    const fieldChanged = (fieldId, value) => {
        setValues((currentValues) => {
            currentValues[fieldId] = value;
            currentValues["post-type"] = props.type;
            return currentValues;
        });
    };
    

    let post_id = getPostId(props);
    const handleOnSubmits = async (e) => {
        e.preventDefault();
        for (let [key, value] of Object.entries(values)) {
            let meta_key = key;
            let meta_value = value;
            axios.post(
                'http://localhost:4000/posts/new-post',
                { post_id, meta_key, meta_value })
                .then(res => {
                    if (res.status === 200)
                        console.log('Post successfully created')
                    else
                        Promise.reject()
                })
                .catch(err => alert('Something went wrong'))
        }
        navigate('/dashboard/post?post='+post_id);

    }

    return (
        <>
            <div>
                <Links title='Dashboard' url='/' class='breadcrumb' /> » <Links title={props.titles} url={'/dashboard/edit?post_type=' + props.type} class='breadcrumb' />
            </div>
            <h1 className='content__heading-inline'>{'Add New ' + props.title}</h1>
            <div className='content__post-wrapper'>
                <div className='content__post-container'>
                    <form name="post" id="post" onSubmit={handleOnSubmits}>
                        <div className='content__post-section-1'>
                            <div className='content__post-header'>
                                <label>Title</label>
                                <input type='text' name='post-title' id='post-title' value={values['post-title']}
                                    onChange={(e) => {
                                        fieldChanged(e.target.id, e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <FormSubmit type='new' values={values} post_id={post_id} post_type={props.type}/>
                        

                        {
                            data.map((metabox, i) => {
                                return (
                                    metabox.meta_box ? (
                                        metabox.meta_box.map((fields, i) => {
                                            return (
                                                <div key={i} className='content__post-section-3'>
                                                    <div className='content__post-header'>
                                                        <label>{fields.title}</label>
                                                    </div>
                                                    <Fields data={fields.fields}
                                                        fieldChanged={fieldChanged}
                                                        values={values} />
                                                </div>
                                            );
                                        }
                                        )) : ''
                                );
                            })
                        }
                    </form>
                </div>
            </div>
        </>
    );
}

export default NewPost;