import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';




export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitlizeText = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }


    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitlizeText(this.props.category)} - TodayNews`;
    }



    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fd38c7bbb211414b9225dc1a50e249d0&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json()
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }



    async componentDidMount() {

        this.updateNews();
    }




    // handlePrevClick = async () => {
    //     console.log("Previous");

    //     this.setState({ page: this.state.page - 1 });
    //     this.updateNews();

    // }


    // handleNextClick = async () => {
    //     console.log("Next");

    //     this.setState({ page: this.state.page + 1 });
    //     this.updateNews();
    // }




    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fd38c7bbb211414b9225dc1a50e249d0&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        })
    }




    render() {
        return (
            <>
                <h1 className='text-center' style={{ marginTop: '90px' }}> 𝕋𝕠𝕕𝕒𝕪'𝕤 𝕋𝕆ℙ - {this.capitlizeText(this.props.category)} Headlines</h1>

                {this.state.loading && <Spinner />}
                {/* <Spinner /> */}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    // hasMore={this.state.articles.length !== this.state.totalResults}
                    hasMore={true}
                    // loader={<Spinner />}
                    loader={this.state.loading && <Spinner />}
                >

                    <div className='container'>

                        <div className='row my-5'>
                            {this.state.articles.map((element, id) => {
                                return <div className='col-md-4' key={id}>
                                    <NewsItem title={element.title ? element.title.slice(0, 50) : ""} description={element.description ? element.description.slice(0, 80) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                                </div>
                            })}
                        </div>

                    </div>
                </InfiniteScroll>



                {/* #----->  next & previous button enable kaena hai toh mai yahase enable kr kakta hu  <-----#  */}

                {/* <div className='container d-flex justify-content-between' >
                    <button disabled={this.state.page <= 1} type='button' className='btn btn-dark' onClick={this.handlePrevClick}> &larr; previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}

            </>
        )
    }
}


export default News;
