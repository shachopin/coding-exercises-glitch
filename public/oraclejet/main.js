/**
 * A top-level require call executed by the Application.
 * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
 * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
 * objects in the callback.
 *
 * For a listing of which JET component modules are required for each component, see the specific component
 * demo pages in the JET cookbook.
 */
                                    //implicit baseUrl is where main.js is. Here you do ['lib/calculator']. If right in oraclejet (which is baseUrl now), then just say 'calculator', Cannot say './calculator'
// require(['ojs/ojcore', 'knockout',  'jquery', 'ojs/ojmodule', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojtoolbar','ojs/ojmenu',], // add additional JET component modules as needed
//   function(oj, ko){ // this callback gets executed when all required modules are loaded
//       /*
//       var product = {
//           salesPrice: ko.observable(102.02)
//       };
  
//       $(document).ready(function(){
//           ko.applyBindings(product);
//       });// add any startup code that you want here
//       */

//       function MainModel(){
//         //this.result = new Calc(10, 20).addition(); //Here Calc is not used
//         // this.userName ="shachopin";
//         // this.firstName = "Dawei";
//         // this.lastName = "Dai";
//       };

//       $(document).ready(function (){
//         ko.applyBindings(new MainModel());
//       });  

//   }

// );

/***************************/

requirejs(['application']);
//notice if I moved the above statement  - requirejs(['sweet/main']); - to a separate application.js file
//and include that in index.html
//it won't work, URL:https://requirejs.glitch.me/sweet/main.js 404
//solution option 1  -- the above requirejs way (NOTICE the module being dependent on has to be inside define()), inside that define module, I use require statemnt, because it's a once running thing
//solution option 2  -- directly put the execution code here -- just like the above above MainModel() code

// require(['testcalculator','jquerydawei'], function(Calc){ //notice here testcalculator.js is in the baseUrl lib folder as baseUrl indicates, cannot say './testcalculator'
//     var calculator = new Calc(10,30);
//     console.log(calculator.addition());
//     $("body").append("<h1>Dawei is a genius</h1>");
// });

/***************************/

//RequireJS configs (usually these come first in main.js, but they don't have to)
//taken from  http://jsfiddle.net/pthaden/cbev95yr/?utm_source=website&utm_medium=embed&utm_campaign=cbev95yr
//original post is here:
//http://likeahouseafire.com/2016/09/27/jsfiddle-jet-base-for-2.1.0/
// requirejs.config({
//   // Path mappings for the logical module names
//   paths: {
//     'knockout': '//cdnjs.cloudflare.com/ajax/libs/knockout/3.4.0/knockout-min',
//     'jquery': '//cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min',
//     "jqueryui-amd": "//rawgit.com/jquery/jquery-ui/1.12.0/ui",

//     "promise": "//cdnjs.cloudflare.com/ajax/libs/es6-promise/3.2.1/es6-promise.min",
//     "hammerjs": "//cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min",
//     "ojdnd": "//rawgit.com/oracle/oraclejet/2.1.0/dist/js/libs/dnd-polyfill/dnd-polyfill-1.0.0.min",
//     "ojs": "//rawgit.com/oracle/oraclejet/2.1.0/dist/js/libs/oj/debug",
//     "ojL10n": "//rawgit.com/oracle/oraclejet/2.1.0/dist/js/libs/oj/ojL10n",
//     "ojtranslations": "//rawgit.com/oracle/oraclejet/2.1.0/dist/js/libs/oj/resources",
//     "text": "//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min",
//     "signals": "//cdnjs.cloudflare.com/ajax/libs/js-signals/1.0.0/js-signals.min",

//   },
//   // Shim configurations for modules that do not expose AMD
//   shim: {
//     'jquery': {
//       exports: ['jQuery', '$']
//     }
//   }
// });

//I downloaded the latest ojet starter app and uploaded to bitballon to serve as a staging area for the newest ojet libs
// https://ojet-lib-staging.bitballoon.com
requirejs.config({
// Path mappings for the logical module names
    paths: 
    //injector:mainReleasePaths
     {
        'knockout': 'https://ojet-lib-staging.bitballoon.com/js/libs/knockout/knockout-3.4.0.debug',
        'jquery': 'https://ojet-lib-staging.bitballoon.com/js/libs/jquery/jquery-3.1.1',
        'jqueryui-amd': 'https://ojet-lib-staging.bitballoon.com/js/libs/jquery/jqueryui-amd-1.12.0',
        'promise': 'https://ojet-lib-staging.bitballoon.com/js/libs/es6-promise/es6-promise',
        'hammerjs': 'https://ojet-lib-staging.bitballoon.com/js/libs/hammer/hammer-2.0.8',
        'ojdnd': 'https://ojet-lib-staging.bitballoon.com/js/libs/dnd-polyfill/dnd-polyfill-1.0.0',
        'ojs': 'https://ojet-lib-staging.bitballoon.com/js/libs/oj/v3.1.0/debug',
        'ojL10n': 'https://ojet-lib-staging.bitballoon.com/js/libs/oj/v3.1.0/ojL10n',
        'ojtranslations': 'https://ojet-lib-staging.bitballoon.com/js/libs/oj/v3.1.0/resources',
        'text': 'https://ojet-lib-staging.bitballoon.com/js/libs/require/text',
        'signals': 'https://ojet-lib-staging.bitballoon.com/js/libs/js-signals/signals',
        'customElements': 'https://ojet-lib-staging.bitballoon.com/js/libs/webcomponents/CustomElements'
    },
    // Shim configurations for modules that do not expose AMD
    shim: {
        'jquery': {
            exports: ['jQuery', '$']
        }
    },
});