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
    var currentdate = new Date();
    var datetime =currentdate.getDay() + "-" + currentdate.getMonth() 
    + "-" + currentdate.getFullYear() + " " 
    + currentdate.getHours() + ":" 
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();

    const fieldChanged = (fieldId, value) => {
        setValues((currentValues) => {
            currentValues[fieldId] = value;
            currentValues["post-type"] = props.type;
            currentValues["created-at"] = datetime;
            return currentValues;
        });
    };
    

    let post_id = getPostId(props);

    return (
        <>
            <div>
                <Links title='Dashboard' url='/' class='breadcrumb' /> » <Links title={props.titles} url={'/dashboard/edit?post_type=' + props.type} class='breadcrumb' />
            </div>
            <h1 className='content__heading-inline'>{'Add New ' + props.title}</h1>
            <div className='content__post-wrapper'>
                <div className='content__post-container'>
                    <form name="post" id="post">
                        <div className='content__post-message'>
                            <p className='content__post-message-val'>Post Updated.</p>
                        </div>
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
                        <FormSubmit type='new' values={values} post_id={post_id} post_type={props.type} post_title={props.title}/>
                        

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