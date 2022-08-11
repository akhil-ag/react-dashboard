import React from 'react';
import Logo from '../../../resources/images/logo.png'
import Icons from '../../atoms/icons'
import './index.scss'

export default function Header(){
		return (
			<div className="adminbar">
				<div className="adminbar__wrapper">
					<ul>
						<li>
							<a href='https://sc.com/sg' className="adminbar__logo">
								<img src={Logo} alt='React' className='adminbar__logo-img' />
							</a>
						</li>
						<li className='adminbar__env'>
							<div className='adminbar__env-wrapper'>
								<span>dev</span>
							</div>
						</li>
						<li>
							<a 
							href='https://sc.com/sg' >
								<Icons title="dashicons:admin-multisite" class="dashboard-header" />
								My Sites
							</a>
						</li>
						<li>
							<a 
							href='https://sc.com/sg'>
								<Icons title="dashicons:admin-home" class="dashboard-header" />
								React Dashboard
							</a>
						</li>
						<li>
							<a 
							href='https://sc.com/sg' >
								<Icons title="dashicons:admin-comments" class="dashboard-header" />
								538
							</a>
						</li>
						<li>
							<a 
							href='https://sc.com/sg' >
								<Icons title="dashicons:plus" class="dashboard-header" />
								New
							</a>
						</li>
					</ul>
					<ul className='adminbar__profile-main'>
						<li>
							<a href='https://sc.com/sg' className='adminbar__title adminbar__profile'>
                            <Icons title="dashicons:admin-users" class="dashboard-header" />
								Akhil
							</a>
						</li>
					</ul>
				</div>
			</div>
		);
	}