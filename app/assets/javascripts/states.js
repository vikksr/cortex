angular.module('cortex.states', [
  'ui.router.state',

  'cortex.services.cortex',
  'cortex.templates',

  'cortex.controllers.media.edit',
  'cortex.controllers.media.filters',
  'cortex.controllers.media.grid',
  'cortex.controllers.media.new',
  'cortex.controllers.organizations',
  'cortex.controllers.organizations.manage',
  'cortex.controllers.posts.edit',
  'cortex.controllers.posts.filters',
  'cortex.controllers.posts.grid',
  'cortex.controllers.posts.popup',
  'cortex.controllers.tenants.edit',
  'cortex.controllers.tenants.manage',
  'cortex.controllers.users.edit'
])

.config(function ($stateProvider, $urlRouterProvider) {

  // Catch /admin/media link from breadcrumb
  $urlRouterProvider.when('/media', '/media///');

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'login',
      data: {pageTitle: 'Login'}
    })

    .state('cortex', {
      abstract: true,
      url: '',
      templateUrl: 'main.html',
      data: {
        ncyBreadcrumbLabel: 'Home'
      }
    })

    // Media

    .state('cortex.media', {
      url: '/media',
      abstract: true,
      template: '<div class="media" ui-view></div>',
      data: {
        ncyBreadcrumbLabel: 'Media',
        ncyBreadcrumbLink: '/media///'
      }
    })

    .state('cortex.media.new', {
      url: '/new',
      templateUrl: 'media/new.html',
      controller: 'MediaNewCtrl',
      data: {
        ncyBreadcrumbLabel: 'Add Media'
      }
    })

    .state('cortex.media.edit', {
      url: '/:mediaId/edit',
      templateUrl: 'media/edit.html',
      controller: 'MediaEditCtrl',
      data: {
        ncyBreadcrumbLabel: 'Edit Media'
      }
    })

    .state('cortex.media.manage', {
      url: '',
      abstract: true,
      templateUrl: 'media/manage.html',
      data: {
        ncyBreadcrumbLabel: false
      }
    })

    .state('cortex.media.manage.components', {
      url: '/:page/:perPage/:query',
      views: {
        'media-grid': {
          templateUrl: 'media/grid.html',
          controller: 'MediaGridCtrl'
        },
        'media-filters': {
          templateUrl: 'media/filters.html',
          controller: 'MediaFiltersCtrl'
        }
      },
      data: {
        ncyBreadcrumbLabel: false
      }
    })

    // Posts

    .state('cortex.posts', {
      url: '/posts',
      abstract: true,
      template: '<div class="admin-posts" ui-view></div>',
      data: {
        ncyBreadcrumbLabel: 'Posts'
      }
    })

    .state('cortex.posts.new', {
      url: '/new',
      templateUrl: 'posts/edit.html',
      controller: 'PostsEditCtrl',
      resolve: {
        post: function() {
          return null;
        },
        categoriesHierarchy: ['cortex', function(cortex) {
          return cortex.categories.hierarchy().$promise;
        }],
        filters: ['cortex', function(cortex) {
          return cortex.posts.filters().$promise;
        }],
        currentUserAuthor: ['cortex', 'currentUser', function(cortex, currentUser) {
          return cortex.userAuthor.get({user_id: currentUser.id}).$promise;
        }]
      },
      data: {
        ncyBreadcrumbLabel: 'New Post'
      }
    })

    .state('cortex.posts.edit', {
      url: '/:postId/edit',
      templateUrl: 'posts/edit.html',
      controller: 'PostsEditCtrl',
      resolve: {
        post: ['cortex', '$stateParams', function(cortex, $stateParams) {
          return cortex.posts.get({id: $stateParams.postId}).$promise;
        }],
        categoriesHierarchy: ['cortex', function(cortex) {
          return cortex.categories.hierarchy().$promise;
        }],
        filters: ['cortex', function(cortex) {
          return cortex.posts.filters().$promise;
        }],
        currentUserAuthor: ['cortex', 'currentUser', function(cortex, currentUser) {
          return cortex.userAuthor.get({user_id: currentUser.id}).$promise;
        }]
      },
      data: {
        ncyBreadcrumbLabel: 'Edit Post'
      }
    })

    // Posts Edit + Media Popup
    // **********************

    .state('cortex.posts.edit.media', {
      url: '/media',
      abstract: true,
      templateUrl: 'posts/popup.html',
      controller: 'PostsPopupCtrl',
      data: {
        ncyBreadcrumbLabel: false
      }
    })

    .state('cortex.posts.edit.media.new', {
      url: '/new',
      templateUrl: 'media/new.html',
      controller: 'MediaNewCtrl',
      data: {
        ncyBreadcrumbLabel: false
      }
    })

    .state('cortex.posts.edit.media.edit', {
      url: '/:mediaId/edit',
      templateUrl: 'media/edit.html',
      controller: 'MediaEditCtrl',
      data: {
        ncyBreadcrumbLabel: false
      }
    })

    .state('cortex.posts.edit.media.manage', {
      url: '',
      abstract: true,
      templateUrl: 'media/manage.html',
      data: {
        ncyBreadcrumbLabel: false
      }
    })

    .state('cortex.posts.edit.media.manage.components', {
      url: '/:page/:perPage/:query',
      views: {
        'media-grid': {
          templateUrl: 'media/grid.html',
          controller: 'MediaGridCtrl'
        },
        'media-filters': {
          templateUrl: 'media/filters.html',
          controller: 'MediaFiltersCtrl'
        }
      },
      data: {
        ncyBreadcrumbLabel: false
      }
    })

    .state('cortex.posts.new.media', {
      url: '/media',
      abstract: true,
      templateUrl: 'posts/popup.html',
      controller: 'PostsPopupCtrl',
      data: {
        ncyBreadcrumbLabel: false
      }
    })

    .state('cortex.posts.new.media.new', {
      url: '/new',
      templateUrl: 'media/new.html',
      controller: 'MediaNewCtrl',
      data: {
        ncyBreadcrumbLabel: false
      }
    })

    .state('cortex.posts.new.media.edit', {
      url: '/:mediaId/edit',
      templateUrl: 'media/edit.html',
      controller: 'MediaEditCtrl',
      data: {
        ncyBreadcrumbLabel: false
      }
    })

    .state('cortex.posts.new.media.manage', {
      url: '',
      abstract: true,
      templateUrl: 'media/manage.html',
      data: {
        ncyBreadcrumbLabel: false
      }
    })

    .state('cortex.posts.new.media.manage.components', {
      url: '/:page/:perPage/:query',
      views: {
        'media-grid': {
          templateUrl: 'media/grid.html',
          controller: 'MediaGridCtrl'
        },
        'media-filters': {
          templateUrl: 'media/filters.html',
          controller: 'MediaFiltersCtrl'
        }
      },
      data: {
        ncyBreadcrumbLabel: false
      }
    })

    // **********************

    .state('cortex.posts.manage', {
      url: '',
      abstract: true,
      templateUrl: 'posts/manage.html',
      data: {
        ncyBreadcrumbLabel: false
      }
    })

    .state('cortex.posts.manage.components', {
      url: '',
      views: {
        'posts-grid': {
          templateUrl: 'posts/grid.html',
          controller: 'PostsGridCtrl'
        },
        'posts-filters': {
          templateUrl: 'posts/filters.html',
          controller: 'PostsFiltersCtrl'
        }
      },
      data: {
        ncyBreadcrumbLabel: false
      }
    })

    // Tenants

    .state('cortex.organizations', {
      url: '/organizations/:organizationId',
      template: '<ui-view/>',
      abstract: true,
      controller: 'OrganizationsCtrl',
      resolve: {
        organizations: ['cortex', function(cortex) {
          return cortex.tenants.query().$promise;
        }]
      },
      data: {
        ncyBreadcrumbLabel: 'Tenants'
      }
    })

    .state('cortex.organizations.tenants', {
      url: '',
      template: '<ui-view/>',
      abstract: true,
      data: {
        ncyBreadcrumbLabel: false
      }
    })

    .state('cortex.organizations.tenants.edit', {
      url: '/tenants/:tenantId/edit',
      templateUrl: 'tenants/edit.html',
      controller: 'EditTenantsCtrl',
      data: {
        ncyBreadcrumbLabel: 'Edit Tenant'
      }
    })

    .state('cortex.organizations.tenants.new', {
      url: '/tenants/new',
      templateUrl: 'tenants/edit.html',
      controller: 'EditTenantsCtrl',
      data: {
        ncyBreadcrumbLabel: 'Add Tenant'
      }
    })

    .state('cortex.organizations.manage', {
      url: '',
      templateUrl: 'organizations/manage.html',
      controller: 'OrganizationsManageCtrl',
      data: {
        ncyBreadcrumbLabel: false
      }
    })

    .state('cortex.organizations.manage.tenants', {
      url: '/tenants/:tenantId',
      views: {
        'tenants-tree': {
          templateUrl: 'tenants/manage.tree.html',
          controller: 'TenantsTreeCtrl'
        },
        'tenants-details': {
          templateUrl: 'tenants/manage.details.html'
        }
      },
      resolve: {
        organization: ['$stateParams', 'cortex', function($stateParams, cortex) {
          return cortex.tenants.get({id: $stateParams.organizationId, include_children: true}).$promise;
        }]
      },
      data: {
        ncyBreadcrumbLabel: false
      }
    })

    // Products

    .state('cortex.products', {
      url: '/products',
      template: '<div class="container">Here ly thy beast, Products</div>',
      data: {
        ncyBreadcrumbLabel: 'Apps/Products'
      }
    })

    // Permissions

    .state('cortex.permissions', {
      url: '/permissions',
      template: '<div class="container">Here ly thy beast, Permissions</div>',
      data: {
        ncyBreadcrumbLabel: 'Roles/Permissions'
      }
    })

    .state('cortex.users', {
      url: '/users',
      abstract: true,
      template: '<ui-view/>'
    })

    .state('cortex.users.edit', {
      url: '/:userId',
      templateUrl: 'users/edit.html',
      controller: 'UsersEditCtrl',
      data: {
        ncyBreadcrumbLabel: 'Users/Edit'
      },
      resolve: {
        user: ['$stateParams', 'cortex', function($stateParams, cortex) {
          return cortex.users.get({id: $stateParams.userId});
        }],
        author: ['$stateParams', '$q', 'cortex', function($stateParams, $q, cortex) {
          var defer = $q.defer();

          // Resolve the user's author information or create a new userAuthor resource
          cortex.userAuthor.get({user_id: $stateParams.userId}).$promise
            .then(function(author) {
              author.user_id = $stateParams.userId;
              defer.resolve(author);
            }, function(response) {
              if (response.status === 404) {
                defer.resolve(new cortex.userAuthor({user_id: $stateParams.userId}));
              } else {
                defer.reject(response);
              }
            });

          return defer.promise;
        }]
      }
    });
});
