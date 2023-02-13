import React, { Component } from 'react'
import { Link } from "react-router-dom";


export class Newsitem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, date } = this.props;
        return (

            <div className='container my-3'>
                <div className="card">

                    {/* <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        right: '0'
                    }}>
                        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                            {source ? source : "Unknown"}
                        </span>
                    </div> */}

                    <img src={imageUrl ? imageUrl : "default image set.jpg"} className="card-img-top" alt="..." />
                    <div className="card-body">

                        {/* <h5 className="card-title">{title}...</h5>     // isko aise bhi rakh sakta hu q ki bina title ke kuch nahi ho sakta...*/}

                        {/* man lo ki kabhi kabhi [ Title/Discription ] MISSING hai ya / NULl toh hm ye trick used kr sakte hai... */}
                        <h5 className="card-title">{title ? title + "..." : ""}</h5>
                        <p className="card-text">{description ? description + "..." : ""}</p>
                        <p className="card-text"><small style={{ color: "blue" }}>By {author ? author : "Unknown"} on {new Date(date).toGMTString()} </small></p>
                        <Link to={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</Link>
                    </div>
                </div>
            </div >
        )
    }
}

export default Newsitem; 