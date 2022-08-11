import React, { useMemo, useState, useEffect } from 'react';
import './index.scss'
import Links from '../../atoms/links'
import { Link } from 'react-router-dom';
import Pagination from '../../molecules/pagination';
// import data from '../dashboard/mock-data.json'
import Icons from '../../atoms/icons'
import axios from 'axios'
import { getPostData } from './values'

let PageSize = 10;
function Edit(props) {
    let postMeta = getPostData(props.type)
    postMeta.sort(function (a, b) {
        return a.post_id - b.post_id;
    });

    let postCount = -1;
    let postData =[{}];
    let postId = 0;
    for (let [key, value, i] of Object.entries(postMeta)) {
        if(postId != value.post_id){
            postId = value.post_id;
            postCount = postCount+1;
            postData[postCount] = {
                'id' : value.post_id
            }
        }
        if(value.meta_key == 'post-type'){
            postData[postCount].type = value.meta_value;
        }
        if(value.meta_key == 'post-title'){
            postData[postCount].title = value.meta_value
        }
        
    }
    // console.log(postData)

    const [currentPage, setCurrentPage] = useState(1);

    // useEffect(() =>{
    //     setCurrentPage(1);
    // },[1])

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return postData.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, postData, props]);

    return (
        <>
            <div>
                <Links title='Dashboard' url='/' class='breadcrumb' /> » <Links title={props.title} url={'/dashboard/edit?post_type=' + props.type} class='breadcrumb' />
            </div>
            <h1 className='content__heading-inline'>{props.title}</h1>
            <Links title='Add New' url={'/dashboard/post-new?post_type=' + props.type} class='green-hollow-white' />
            <hr></hr>
            <ul className='content__filter-buttons'>
                <li>
                    <Link to="/dashboard/edit?post_type=accordian&all_posts=1">All <span >({postCount + 1})</span></Link> |
                </li>
                <li>
                    <Link to="/dashboard/edit?post_type=accordian&all_posts=1">Mine <span >(3)</span></Link> |
                </li>
                <li>
                    <Link to="/dashboard/edit?post_type=accordian&all_posts=1">Published <span >(36)</span></Link> |
                </li>
                <li>
                    <Link to="/dashboard/edit?post_type=accordian&all_posts=1">Drafts <span >(3)</span></Link> |
                </li>
                <li>
                    <Link to="/dashboard/edit?post_type=accordian&all_posts=1">Edit Draft <span >(2)</span></Link> |
                </li>
            </ul>
            <div className='content__search-box'>
                <input placeholder="Enter Post Title" />
            </div>
            <hr></hr>
            <div className='content__filter-wrapper'>
                <div className='content__filter-actions'>
                    Apply
                </div>
                <Pagination
                    // className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={postData.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                />
            </div>
            <div className='content__edit'>
                <table>
                    <thead>
                        <tr>
                            <th className='check-column'>
                                <input type='checkbox' />
                            </th>
                            <th className='sortable'>
                                <Link to='dashboard/?orderby=ID' ><span>Title</span>
                                    <span className='sorting-indicator'>
                                        <Icons title='dashicons:arrow-down' class='arrow-sort' />
                                    </span>
                                </Link>
                            </th>
                            <th className='sortable'>
                                <Link to='dashboard/?orderby=ID' ><span>Requestor</span>
                                    <span className='sorting-indicator'>
                                        <Icons title='dashicons:arrow-down' class='arrow-sort' />
                                    </span>
                                </Link>
                            </th>
                            <th className='sortable'>
                                <Link to='dashboard/?orderby=ID' ><span>Approver</span>
                                    <span className='sorting-indicator'>
                                        <Icons title='dashicons:arrow-down' class='arrow-sort' />
                                    </span>
                                </Link>
                            </th>
                            <th className='sortable'>
                                <Link to='dashboard/?orderby=ID' ><span>Publisher</span>
                                    <span className='sorting-indicator'>
                                        <Icons title='dashicons:arrow-down' class='arrow-sort' />
                                    </span>
                                </Link>
                            </th>
                            <th className='sortable'>
                                <Link to='dashboard/?orderby=ID' ><span>Date</span>
                                    <span className='sorting-indicator'>
                                        <Icons title='dashicons:arrow-down' class='arrow-sort' />
                                    </span>
                                </Link>
                            </th>
                            <th>
                                Actions
                            </th>
                            <th>
                                Tasks
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTableData.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td className='check-column'><input type='checkbox' /></td>
                                    <td className='post-title'><Link to={'/dashboard/post?post=' + item.id} >{item.title}</Link></td>
                                    <td>{item.type}</td>
                                    <td>{item.type}</td>
                                    <td>{item.type}</td>
                                    <td>{item.type}</td>
                                    <td>{item.a2}</td>
                                    <td>{item.a3}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Edit;