import React, {useState, useContext, useEffect} from 'react'
import {Redirect} from 'react-router-dom'

import {CurrentUserContext} from 'contexts/currentUser'
import useFetch from 'hooks/useFetch'
import BackendErrorMessages from 'components/backendErrorMessages'
import useLocalStorage from 'hooks/useLocalStorage'

const Settings = () => {
  const apiUrl = '/user'
  const [{response, error}, doFetch] = useFetch(apiUrl)
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [bio, setBio] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [currentUserState, dispatch] = useContext(CurrentUserContext)
  const [, setToken] = useLocalStorage('token')
  const [successfullLogout, setIsSuccessfullLogout] = useState(false)

  const handleSubmit = event => {
    event.preventDefault()
    doFetch({
      method: 'put',
      data: {
        user: {
          ...currentUserState.currentUser,
          image,
          bio,
          username: name,
          email,
          password
        }
      }
    })
  }
  const logout = event => {
    event.preventDefault()
    setToken('')
    dispatch({type: 'SET_UNAUTHORIZED'})
    setIsSuccessfullLogout(true)
  }

  useEffect(() => {
    if (!currentUserState.currentUser) {
      return
    }
    const currentUser = currentUserState.currentUser

    setName(currentUser.username)
    setImage(currentUser.image)
    setBio(currentUser.bio)
    setEmail(currentUser.email)
  }, [currentUserState.currentUser])

  useEffect(() => {
    if (!response) {
      return
    }

    dispatch({type: 'SET_AUTHORIZED', payload: response.user})
  }, [response, dispatch])

  if (successfullLogout) {
    return <Redirect to="/" />
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your settings</h1>
            {error && <BackendErrorMessages backendErrors={error.errors} />}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="URL of profile picture"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Username"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Short bio"
                    value={bio}
                    rows="8"
                    onChange={e => setBio(e.target.value)}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="New password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </fieldset>
                <button
                  type="submit"
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  Update settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button className="btn btn-outline-danger" onClick={logout}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
