import React from 'react'
import {Switch, Route} from 'react-router-dom'
import GlobalFeed from 'src/pages/globalFeed'
import YourFeed from 'src/pages/yourFeed'
import TagFeed from 'src/pages/tagFeed'
import Article from 'src/pages/article'
import Authentication from 'src/pages/authentication'
import CreateArticle from 'src/pages/createArticle'
import EditArticle from 'src/pages/editArticle'
import Settings from 'src/pages/settings'
import UserProfile from 'src/pages/userProfile'

const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={GlobalFeed} exact />
      <Route path="/profiles/:slug" component={UserProfile} />
      <Route path="/profiles/:slug/favorites" component={UserProfile} />
      <Route path="/settings" component={Settings} exact />
      <Route path="/articles/new" component={CreateArticle} />
      <Route path="/articles/:slug/edit" component={EditArticle} />
      <Route path="/feed" component={YourFeed} exact />
      <Route path="/tags/:slug" component={TagFeed} />
      <Route path="/articles/:slug" component={Article} />
      <Route path="/login" component={Authentication} />
      <Route path="/register" component={Authentication} />
    </Switch>
  )
}
export default Routes
