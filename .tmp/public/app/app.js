define(function(){var e=angular.module("coreModule");e.service("BPConfig",function(){var e={apiUrl:"/api"};return e}),e.filter("split",function(){return function(e,t,n){return e.split(t)[n]}}).filter("encode",["$base64",function(e){return function(t,n){if(n)var r=t+"$"+n;else var r=t;return e.encode(r)}}]),e.factory("focus",["$timeout",function(e){return function(t){e(function(){var e=document.getElementById(t);e&&e.focus()})}}]).factory("blur",["$timeout",function(e){return function(t){e(function(){var e=document.getElementById(t);e&&e.blur()})}}]),e.factory("searchTypeahead",[function(){return function(){var e=getUrlParameter("q");$("#searchText").val(decodeURIComponent(e));var t=function(e){var t=$.map(e[1],function(e){return{value:e[0]}});return t},n=new Bloodhound({datumTokenizer:Bloodhound.tokenizers.whitespace,queryTokenizer:Bloodhound.tokenizers.whitespace,remote:{url:"http://suggestqueries.google.com/complete/search?client=youtube&hl=en&sugexp=gsnos%2Cn%3D13&gs_ri=youtube&ds=yt&q=%QUERY",ajax:{type:"GET",dataType:"jsonp"},filter:t}});n.initialize(),$("#searchText").typeahead({hint:!0,highlight:!0,minLength:1},{name:"results",displayKey:"value",source:n.ttAdapter()});var r=function(e,t,n){angular.element("#searchForm").scope().search(t.value)},a=function(e,t,n){$("#searchText").keyup(function(e){13==e.keyCode&&angular.element("#searchForm").scope().search(t.value)})};$("#searchText").on("typeahead:autocompleted",a).on("typeahead:selected",r).keyup(function(e){13==e.keyCode&&angular.element("#searchForm").scope().search($("#searchText").val())}),$("#searchSubmit").on("click",function(){angular.element("#searchForm").scope().search($("#searchText").val())})}}]).factory("player",[function(){return function(e,t,n){if("repeat"!=e)var r="id="+e;else var r="repeat=1";var a=document.getElementById("player");if("repeat"!=e)if(0==t)var i="player.html?"+r+"&kind=yt";else if(1==t)var i="player.html?"+r+"&playlist=1&kind=yt";else if(2==t)var i="player.html?"+r+"&kind=sc";else var i="player.html?"+r+"&playlist=1&kind=sc";else var i="player.html?"+r;if("null"!=n){var l=n.split("$");if("playlist"==l[0])var o=i+"&bp="+l[1]}else var o=i;var s="100%",u="100%";a.innerHTML='<iframe width="'+s+'" height="'+u+'" src="'+o+'" frameborder="0" id="youtubeplayer" allowfullscreen="1"></iframe>'}}]).controller("Player",["$scope","$element","$location","$http","player","$rootScope","$translate","$translatePartialLoader","$timeout",function(e,t,n,r,a,i,l,o,s){function u(e){isPlaying=1==e?!0:!1}function c(t){l("Player").then(function(t){e.Player=t}),l("big_small").then(function(t){e.big_small=t}),s(function(){var n=e.Player+"$"+e.big_small;if("null"!=t){var r=t.split("$");if("playlist"==r[2]){i.kindPlayer="playlist";var l=r[2]+"$"+r[3]}else{i.kindPlayer="search";var l="null"}"repeat"==r[0]?(a("repeat",0,l,n),u(1)):"youtube"==r[0]?(a(r[1],0,l,n),u(1)):"soundcloud"==r[0]?(a(r[1],2,l,n),u(1)):(a(r[1],1,l,n),u(1))}},10)}o.addPart("player"),l.refresh(),e.repeatAll=function(e){console.log("repeat")},e.next=function(e,t,n,l){if("yt"==t)if(1==n)var o="YTplaylist$"+l;else var o="youtube$"+l;else if("sc"==t)var o="soundcloud$"+l;var s=i.kindPlayer;if("search"==s){var f=i.mergedItems,d=0;for(items in f)d++;if(0!=d){var p=f.indexOf(o);f.splice(p,1);var h=f[0],y=i.prevMergedItems;y.push(o),c(h)}else{i.mergedItems=i.prevMergedItems,i.prevMergedItems=[];var h=f[0];c(h)}}else e?r.get(APIurl+"/playlists/"+e+"/next/"+o).then(function(t){if(t.data.finished){var n="repeat$1$playlist$"+e;c(n)}else{var n=t.data.id+"$playlist$"+e;c(n)}}):(u(0),a(null,null,"destroy"))},e.prev=function(e,t,n,l){if("yt"==t)if(1==n)var o="YTplaylist$"+l;else var o="youtube$"+l;else if("sc"==t)var o="soundcloud$"+l;var s=i.kindPlayer;if("search"==s){var f=i.prevMergedItems,d=0;for(items in f)d++;if(0!=d){var p=0;for(items in f){if(p+1==d){var h=f[p],y=i.mergedItems;y.push(f[p]),f.splice(p,1),c(h)}p++}}else{var h=y[0];c(h)}}else e?r.get(APIurl+"/playlists/"+e+"/prev/"+o).then(function(t){if(t.data.finished){var n="repeat$1$playlist$"+e;c(n)}else{var n=t.data.id+"$playlist$"+e;c(n)}}):(u(0),a(null,null,"destroy"))},e.isPlaying=function(){return isPlaying},e.play=function(){var e=angular.element(t),n=$(e).attr("url");c(n)},e.destroy=function(){l("Player").then(function(t){e.Player=t}),s(function(){u(0),a(null,null,"destroy",e.Player)},10)}}]).controller("LoadPlayer",["$scope","$element","$location","player",function(e,t,n,r){function a(e){isPlaying=1==e?!0:!1}a(),e.isPlaying=function(){return isPlaying}}]),e.directive("include",["$http","$templateCache","$compile",function(e,t,n){return{restrict:"A",link:function(r,a,i){var l=r.$eval(i.include);e.get(l,{cache:t}).success(function(e){a.replaceWith(n(e)(r))})}}}]),e.directive("ngEnter",function(){return function(e,t,n){t.bind("keydown keypress",function(t){13===t.which&&(e.$apply(function(){e.$eval(n.ngEnter)}),t.preventDefault())})}}),e.service("loadUserInfo",["$http","toastr",function(e,t){return function(n){var r=e.get(APIurl+"/user/me").then(function(e){return e.data})["catch"](function(e,n){t.error("Unexpected error "+e.data)})["finally"](function(){$("#loading").hide()});return r}}]),e.service("loadPlaylists",["$http","toastr",function(e,t){return function(n){var r=e.get(n+"/playlists/me").then(function(e){return e.data})["catch"](function(e,n){t.error("Unexpected error "+e.data)})["finally"](function(){$("#loading").hide()});return r}}]).service("loadPlaylistsItems",["$http","toastr",function(e,t){return function(n,r){var a=e.get(n+"/playlists/"+r+"/items").then(function(e){return e.data})["catch"](function(e,n){t.error("Unexpected error "+e.data)});return a}}]).service("reorderPlaylist",["$http","toastr",function(e,t){return function(n,r,a){var i=e.post(n+"/playlists/"+r+"/items/reorder",a).then(function(e){})["catch"](function(e,n){t.error("Unexpected error, the playlists didn't save the changes.")});return i}}]),e.service("youtubeSearch",["$http","toastr",function(e,t){return function(n,r,a){var i=r.replace(/[#\/]/g,"").replace(/\\/g,"");if(!a)var a="null";var l=e.get(APIurl+"/youtube/search/"+i+"/"+a).then(function(e){return e.data})["catch"](function(e,n){t.error("Unexpected error "+response.data)})["finally"](function(){$("#loading").hide()});return l}}]).service("soundcloudSearch",["$http","toastr",function(e,t){return function(n,r,a){var i=r.replace(/[#\/]/g,"").replace(/\\/g,"");if(!l)var l="null";var o=e.get(APIurl+"/soundcloud/search/"+i+"/"+l).then(function(e){return e.data})["catch"](function(e,n){t.error("Unexpected error "+response.data)})["finally"](function(){$("#loading").hide()});return o}}]),e.controller("mainController",["$scope","$auth","$translatePartialLoader","loadUserInfo","BPConfig",function(e,t,n,r,a){n.addPart("head"),n.addPart("home"),n.addPart("playlists"),n.addPart("search"),e.isAuthenticated=t.isAuthenticated,e.loaded=!0,e.userInfo=function(){r(a.apiUrl).then(function(t){e.profile=t.user})}}]),e.controller("headController",["$scope","$translate","$location","$auth","BPConfig","loadUserInfo","focus","blur","searchTypeahead",function(e,t,n,r,a,i,l,o,s){e.profilePicture="/assets/img/userDefault.png",l("searchText"),e.search=function(e){e&&(n.path("/search").search({q:e}),o("searchText"))},e.loadUser=function(){i(a.apiUrl).then(function(t){t.user.picture&&(e.profilePicture=t.user.picture),s()})},e.logout=function(){r.logout()}}]),e.directive("showFocus",["$timeout",function(e){return function(t,n,r){t.$watch(r.showFocus,function(t){e(function(){t&&n.focus()})},!0)}}]).filter("encodeURIComponent",function(){return window.encodeURIComponent}).filter("decodeURIComponent",function(){return window.decodeURIComponent}).controller("playlistsController",["$scope","$rootScope","$translate","$filter","$http","$location","getCSRF","BPConfig","loadPlaylists","loadPlaylistsItems","reorderPlaylist","toastr",function(e,t,n,r,a,i,l,o,s,u,c,f){e.loading=!0;var d=i.search().playlist;e.Playlists=function(){s(o.apiUrl).then(function(t){var n=r("orderBy")(t,"title");e.playlists=n,"/"==i.url()&&i.path("/").search({playlist:n[0].id})})},e.PlaylistDetail=function(t){t?i.path("/").search({playlist:t.id}):void 0!=d&&u(o.apiUrl,d).then(function(t){e.PlaylistTitle=t.title,e.PlaylistId=t.id,e.ItemsResults=t.items,e.loading=!1})},e.saveChanges=function(){n("changes_saved").then(function(t){f.success(t+"."),e.show=!1}),l(),c(o.apiUrl,d,e.ItemsResults)},e.changeItem=function(t,n){var r=e.ItemsResults.indexOf(n);if(t!=r+1){var a,i=e.ItemsResults.length-1;e.show=!0,a=1>=t?0:t>i?i:t-1;var l=[],o=0;angular.forEach(e.ItemsResults,function(t){l.push(r>a?o==a?n:a>o?t:o>r?t:e.ItemsResults[o-1]:o==a?n:r>o?t:a>o?e.ItemsResults[o+1]:o>r?t:e.ItemsResults[o-1]),o==i&&(e.ItemsResults=l),o++})}},e["delete"]=function(t){var n=e.ItemsResults.indexOf(t);-1!=n&&e.ItemsResults.splice(n,1),e.show=!0}}])});