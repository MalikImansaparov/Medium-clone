import React, {useEffect, Fragment} from 'react'
import {stringify} from 'query-string'
import Feed from 'src/components/feed'
import useFetch from 'src/hooks/useFetch'
import Pagination from 'src/components/pagination'
import {getPaginator, limit} from 'src/utils'
import PopularTags from 'src/components/popularTags'
import Loading from 'src/components/loading'
import ErrorMessage from 'src/components/errorMessage'
import FeedToggler from 'src/components/feedToggler'
import Banner from 'src/components/banner'

const TagFeed = ({location, match}) => {
  const tagName = match.params.slug
  console.log('tagName', tagName)
  const {offset, currentPage} = getPaginator(location.search)
  const stringifiedParams = stringify({
    limit,
    offset,
    tag: tagName
  })
  const apiUrl = `/articles?${stringifiedParams}`
  const currentUrl = match.url
  const [{response, error, isLoading}, doFetch] = useFetch(apiUrl)

  useEffect(() => {
    doFetch()
  }, [currentPage, doFetch])

  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler tagName={tagName} />
            {isLoading && <Loading />}
            {error && <ErrorMessage />}
            {!isLoading && response && (
              <Fragment>
                <Feed articles={response.articles} />
                <Pagination
                  total={response.articlesCount}
                  limit={limit}
                  url={currentUrl}
                  currentPage={currentPage}
                />
              </Fragment>
            )}
          </div>
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TagFeed
