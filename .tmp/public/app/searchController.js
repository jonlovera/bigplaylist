define(function(){angular.module("coreModule").registerController("searchController",["$scope","$rootScope","$translate","$location","getCSRF","searchService","playlistsService","$filter",function(e,t,s,n,r,l,o,u){function i(){s("views").then(function(t){e.views=t,l.youtube(a,"",e.playlists,function(t){e.youtubeResultsItems=t.results.items,e.YTresults=t,c()}),l.soundcloud(a,"",e.playlists,function(t){e.soundcloudResultsItems=t.results,e.SCresults=t,c()})})}function c(){function s(e,t){function s(e){var t=Math.floor(Math.random()*e.length),s=e[t];return e.splice(t,1),s}for(var n=[];e.length||t.length;)e.length&&(n[n.length]=s(e)),t.length&&(n[n.length]=s(t));return n}if(e.YTresults.items&&e.SCresults.items){var n=s(e.SCresults.items,e.YTresults.items);t.mergedItems=n,t.prevMergedItems=[]}}e.$watch("domAction.loading",function(e){e||i()}),e.YTresults=!1,e.SCresults=!1;var a=n.search().q;a||n.path("/").search({})}])});