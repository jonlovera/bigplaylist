define(function(){angular.module("coreModule").registerController("loginController",["$scope","$translatePartialLoader","$auth","$filter","getCSRF","toastr",function(o,e,n,r,t,a){e.addPart("login"),o.login=function(){o.domAction.element="Sending your info...",o.domAction.loading=!0,t(function(e){var t=r("encode")(o.email,e)+"|"+r("encode")(o.password,e),i=r("encode")(t,e);n.login({0:i})["catch"](function(e){a.error(e.data.err?e.data.err:"Unexpected error "+e.data),o.domAction.loading=!1})})}}])});