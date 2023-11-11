import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import propTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0);


  const updateNews = async () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    props.setProgress(8)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`;
    props.setProgress(20)
    let data = await fetch(url);
    let parsedData = await data.json();
    props.setProgress(50)

    setArticles(parsedData.articles);
    setLoading(false);
    setTotalResults(parsedData.totalResults);

    props.setProgress(100)
  }

  const capatilizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase().concat(word.slice(1));
  }

  const handleScrollToTop = ()=>{
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
  }

  // Runs after the component is rendered
  useEffect(() => {
    updateNews();
    document.title = `${capatilizeFirstLetter(props.category)} - NewsMonkey`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const fetchData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page + 1}`;
    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
  }

  return (
    <>


      <h2 className='mt-5 p-4 text-center'>{`NewsMonkey - ${capatilizeFirstLetter(props.category)} Headlines`}</h2>
      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className='`container my-2 p-2 overflow-hidden'>
          <div className="row row-cols-md-3 row-gap-2 row-cols-2">
            {!loading && articles.map(element => {
              return <div className="col" key={element.url}>
                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} darkMode={props.darkMode} />
              </div>

            })}
          </div>
          
        </div>
        
      </InfiniteScroll>

      <div className='container'>
          <button className="btn btn-sm btn-outline-success position-fixed bottom-0 end-0 mx-5 my-4 fs-3" style={{ rotate: '90deg', zIndex: '10 ' }}  onClick={handleScrollToTop}><span>&lt;</span></button>
        </div>

    </>
  )

}


News.defaultProps = {
  country: 'us',
  pageSize: 10,
  category: 'general'
};

News.propTypes = {
  country: propTypes.string,
  pageSize: propTypes.number,
  category: propTypes.string,

};

export default News;
