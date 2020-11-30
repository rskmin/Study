import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';


const LazyHome = React.lazy(() => import(/* webpackChunkName: "Home" */'./components/Home'));
const LazyLogin = React.lazy(() => import(/* webpackChunkName: "Login" */'./components/Login'));
function Loading() {
  return <div>加载中......</div>
}

ReactDOM.render(
  <Router>
    <>
      <Route path="/" component={() => (
        <Suspense fallback={Loading}>
          <LazyHome />
        </Suspense>
      )} />
      <Route path="/login" component={() => (
        <Suspense fallback={Loading}>
          <LazyLogin />
        </Suspense>
      )} />
    </>
  </Router>,
  document.getElementById('root')
);
