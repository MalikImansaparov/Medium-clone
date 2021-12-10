import React, {useEffect, Fragment} from 'react'
import {stringify} from 'query-string'

import {getPaginator, limit} from 'utils'
import useFetch from 'hooks/useFetch'
import Loading from 'components/loading'
import ErrorMessage from 'components/errorMessage'
import Feed from 'components/feed'
import Pagination from 'components/pagination'

const getApiUrl = ({username, offset, isFavorites}) => {
  const params = isFavorites
    ? {
        limit,
        offset,
        favorited: username
      }
    : {
        limit,
        offset,
        author: username
      }
  return `/articles?${stringify(params)}`
}

const UserArticles = ({username, location, url}) => {
  const isFavorites = location.pathname.includes('favorites')
  const {offset, currentPage} = getPaginator(location.search)
  const apiUrl = getApiUrl({username, offset, isFavorites})
  const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)

  useEffect(() => {
    doFetch()
  }, [doFetch, isFavorites, currentPage])

  return (
    <div>
      {isLoading && <Loading />}
      {error && <ErrorMessage />}
      {!isLoading && response && (
        <Fragment>
          <Feed articles={response.articles} />
          <Pagination
            total={response.articlesCount}
            limit={limit}
            url={url}
            currentPage={currentPage}
          />
        </Fragment>
      )}
    </div>
  )
}

export default UserArticles
