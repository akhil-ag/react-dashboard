import React, { useEffect, useState, setLoading } from 'react';
import { getPostFields } from '../../../resources/js/getPostType'
import './index.scss'
import Links from '../../atoms/links';
import Fields from '../../atoms/fields';
import axios from "axios";
import { getPostId, getPostType, getFormValues } from './values';
import { getPostTitlesJson, getPostTitleJson, } from '../../../layout/values'
import FormSubmit from '../../molecules/formSubmit'

function Post(props) {
    const post_id = getPostId()
    const formValues = getFormValues(post_id)
    const post_type = getPostType(post_id)
    const data = getPostFields(post_type)
    const postTitle = getPostTitleJson(post_type)
    const postTitles = getPostTitlesJson(post_type)

    const [values, setValues] = useState({});

    useEffect(() => {
        setValues((initialValues) => {
            formValues.map((element, i) => {
                initialValues[element.meta_key] = element.meta_value;
                initialValues["post-type"] = post_type;
            })
            return initialValues;
        })
    }, [formValues]);

    const fieldChanged = (fieldId, value) => {
        setValues((currentValues) => {
            currentValues[fieldId] = value;
            currentValues["post-type"] = post_type;
            return currentValues;
        });
        // console.log(values)
    };

    return (
        <>
            <div>
                <Links title='Dashboard' url='/' class='breadcrumb' /> » <Links title={postTitles} url={'/dashboard/edit?post_type=' + post_type} class='breadcrumb' />
            </div>
            <h1 className='content__heading-inline'>{'Edit ' + postTitle}</h1>
            <Links title='Add New' url={'/dashboard/post-new?post_type=' + post_type} class='green-hollow-white' />
            <div className='content__post-wrapper'>
                <div className='content__post-container'>
                    <form name="post" id="post" >
                        <div className='content__post-message'>
                            <p className='content__post-message-val'>Post Updated.</p>
                        </div>
                        <div className='content__post-section-1'>
                            <div className='content__post-header'>
                                <input type='text' name='post-title' id='post-title' defaultValue={values['post-title']}
                                    onChange={(e) => {
                                        fieldChanged(e.target.id, e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <FormSubmit type='update' values={values} post_id={post_id} post_type={post_type} post_title={postTitle}/>


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

export default Post;