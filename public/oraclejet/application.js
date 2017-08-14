define(function(){ //NOTICE the module being dependent on has to be inside define()),
  require(['knockout', 'jquery', 'questionBank', 'ojs/ojknockout'],  // here you are using require because this is a running immediatly and once, not a resuable module 
  //or you can remove the require, and put the dependency array directly in the define function as the first argument
  //ojs/ojcore', 'ojs/ojsunburst' don't have to be in this dependency array, because it was loaded as in depdency array for questionBank module already
  function(ko, $, questionBank)
  {   
      function SunburstModel() {
          var self = this;
          self.nodeValues = ko.observableArray([]);//has to use observableArray here even for just one-way databinding, because need to monitor the data change for the first render
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
          //jquery logic starts here
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
