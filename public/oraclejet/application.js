define(function(){ //NOTICE the module being dependent on has to be inside define()),
  require(['ojs/ojcore', 'knockout', 'jquery', 'questionBank', 'ojs/ojknockout'],  // here you are using require because this is a running immediatly and once, not a resuable module 
  //'ojs/ojsunburst' doesn't have to be in the dependency array, because it was loaded as in depdency array for questionBank module already
  function(oj, ko, $, questionBank)
  {   
      function SunburstModel() {
          var self = this;
          self.nodeValues = ko.observableArray([]);
          grabNodesFromQuestionBank();
          //utiliy function
          function grabNodesFromQuestionBank() {
            questionBank.retrieveNodesFromFirebase() //it returns a promise object
              .then(function(nodes){
                self.nodeValues(nodes);
                //or
                // nodes.forEach(function(node) {
                //   self.nodeValues.push(node);
                // });
              });
          }
      }

      var sunburstModel = new SunburstModel();

      $(
      function()
      {
          ko.applyBindings(sunburstModel, document.getElementById('sunburst-container'));
          $('#sunburst').dblclick(  //because click has been hijacked by ojet sunburst to allow drilldown, so you have to use dblclick to go to external link
            function(event) {
                var nodeContext;
                if (event.target.id !== 'sunburst')
                   nodeContext = $('#sunburst').ojSunburst('getContextByNode', event.target);

                if (nodeContext){
                    var indices = nodeContext['indexPath'];
                    var node = $('#sunburst').ojSunburst('getNode', indices);
                    var url = questionBank.questionUrlMapper[node.label];
                    if(url) {
                      //go to that link
                      //window.location.href = url; //will override the current tab
                      window.open(url, '_blank');
                    }
                }
         }); 
      }
      );
  });
});
