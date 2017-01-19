import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';

import { App, CollectionList, CollectionDetail, Home, HttpStatus,
         UserSettings } from 'containers';


export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user } } = store.getState();
      if (!user.username) {
        // oops, not logged in, so can't be here!
        replace('/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  const userRoutes = [
    /* collection */
    {
      path: ':user',
      name: 'collection',
      breadcrumb: true,
      component: CollectionList,
    },
    {
      path: ':user/_settings',
      name: 'settings',
      onEnter: requireLogin,
      component: UserSettings
    },
    {
      path: ':user/:coll',
      name: 'collectionDetail',
      breadcrumb: true,
      component: CollectionDetail
    }
  ];

  const routes = [
    /* core */
    {
      path: '_register',
      name: 'registration',
      component: HttpStatus
    },

    ...userRoutes,

    {
      path: '*',
      name: 'notfound',
      component: HttpStatus
    }
  ];

  return {
    path: '/',
    component: App,
    indexRoute: { component: Home },
    childRoutes: routes
  };
};
