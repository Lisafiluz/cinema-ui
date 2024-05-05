import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (

	// 	<nav class="navbar navbar-inverse navbar-fixed-top">
    //   <div class="container">
    //     <div class="navbar-header">
    //       <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
    //         <span class="sr-only">Toggle navigation</span>
    //         <span class="icon-bar"></span>
    //         <span class="icon-bar"></span>
    //         <span class="icon-bar"></span>
    //       </button>
    //       <a class="navbar-brand" href="#">Project name</a>
    //     </div>
    //     <div id="navbar" class="collapse navbar-collapse">
    //       <ul class="nav navbar-nav">
    //         <li class="active"><a href="#">Home</a></li>
    //         <li><a href="#">About</a></li>
    //         <li><a href="#">Contact</a></li>
    //       </ul>
    //     </div><!--/.nav-collapse -->
    //   </div>
    // </nav>

			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/">My Movie App</Link>
					<div className="collapse navbar-collapse">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							{/* Add your links here */}
							<li className="nav-item">
								<Link className="nav-link" to="/">Home</Link>
							</li>
							<li>
								<Link className='nav-link' to="/signin">Sign-In</Link>
							</li>
                            <li>
								<Link className='nav-link' to="/orders">My Orders</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
	);
};

export default Navbar;