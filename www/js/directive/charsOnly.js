//angular.module('besties')
besties.directive('charsOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            console.log("directivecalled 1");
            function fromUser(text) {
                console.log("directivecalled");
                if (text) {
                    var transformedInput = text.replace(/[^a-zA-Z ]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    if(text.length<3){
                        console.log("less than 3");
                    }
                    console.log(text+" less than 3 "+text.length+" "+transformedInput);
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});