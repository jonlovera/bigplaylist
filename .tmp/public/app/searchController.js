define(function(){angular.module("coreModule").registerController("searchController",["$scope","$rootScope","$translate","$location","BPConfig","youtubeSearch","soundcloudSearch",function(e,t,o,n,s,u,r){var l=n.search().q;l||n.path("/").search({}),o("views").then(function(o){function n(){function o(e,t){function o(e){var t=Math.floor(Math.random()*e.length),o=e[t];return e.splice(t,1),o}for(var n=[];e.length||t.length;)e.length&&(n[n.length]=o(e)),t.length&&(n[n.length]=o(t));return n}if(e.YTresultsVideos&&e.SCresultsAudios){var n=o(e.SCresultsAudios,e.YTresultsVideos);t.mergedItems=n,t.prevMergedItems=[]}}e.views=o,e.loadYoutubeSearch=function(){u(s.apiUrl,l).then(function(t){e.youtubeResultsItems=t.results.items,e.YTresultsVideos=t.items,n()})},e.loadSoundcloudSearch=function(){r(s.apiUrl,l).then(function(t){e.soundcloudResultsItems=t.results,e.SCresultsAudios=t.items,n()})},e.loadYoutubeSearch(),e.loadSoundcloudSearch()})}])});