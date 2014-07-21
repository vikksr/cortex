angular.module('cortex.controllers.posts.edit.classify', [
  'ngTagsInput',
  'cortex.filters',
  'cortex.directives.modalShow',
  'cortex.services.cortex'
])

.controller('PostsEditClassifyCtrl', function($scope, $filter, _, cortex) {
    $scope.loadTags = function (search) {
      return cortex.posts.tags({s: search}).$promise;
    };

    $scope.data.popularTags = cortex.posts.tags({popular: true});

    // Adds a tag to tag_list if it doesn't already exist in array
    $scope.addTag = function(tag) {
      if (_.some($scope.data.post.tag_list, function(t) { return t.name == tag.name; })) {
        return;
      }
      $scope.data.post.tag_list.push({name: tag.name, id: tag.id});
    };

    $scope.$watch('data.post.job_phase', function(phase) {
      if (phase === undefined) {
        $scope.data.jobPhaseCategories = [];
        return;
      }

      var jobPhaseCategory = _.find($scope.data.categories, function(category) {
        return category.name == phase;
      });

      $scope.data.jobPhaseCategories = jobPhaseCategory.children;
    });
});
