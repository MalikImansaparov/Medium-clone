import {useState, useEffect, useCallback} from 'react'
import axios from 'axios'

import useLocalStorage from 'hooks/useLocalStorage'

export default url => {
  const baseUrl = 'https://conduit.productionready.io/api'
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState({})
  const [token] = useLocalStorage('token')

  const doFetch = useCallback((options = {}) => {
    setOptions(options)
    setIsLoading(true)
  }, [])

  useEffect(() => {
    let skipGetResponseAfterDestroy = false
    if (!isLoading) {
      return
    }

    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : ''
        }
      }
    }

    axios(baseUrl + url, requestOptions)
      .then(res => {
        if (!skipGetResponseAfterDestroy) {
          setResponse(res.data)
          setIsLoading(false)
        }
      })
      .catch(error => {
        if (!skipGetResponseAfterDestroy) {
          setError(error.response.data)
          setIsLoading(false)
        }
      })
    return () => {
      skipGetResponseAfterDestroy = true
    }
  }, [isLoading, url, options, token])

  return [{isLoading, response, error}, doFetch]
}
