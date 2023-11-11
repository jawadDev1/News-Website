import React from 'react'

const NewsItem = ({ title, description, imageUrl, newsUrl, author, date, source, darkMode }) => {
    return (
        <>
            <div className={`card bg-${darkMode} text-${darkMode==='light'? 'dark': 'light'} border-${darkMode==='light'? '': 'light'}`}>
                <span className="position-absolute  translate-middle badge rounded-pill bg-danger" style={{ zIndex: "10", left: '91%' }}> {source} </span>
                <img src={!imageUrl ? 'https://www.hollywoodreporter.com/wp-content/uploads/2023/03/2023_03-WGA-02.jpg?w=1024' : imageUrl} className="card-img-top" alt="News" />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
                </div>
            </div>

        </>
    )
}

export default NewsItem;
