define(['ojs/ojcore', 'ojs/ojsunburst'],
  function(oj){
   //require(['ojs/ojcore'],function(oj){ // here this is going to be a reusable library module, so no require() statment. Require statement is for running immediately and running once   
   //as a resuable library module, you can return any object(literal or instantiated) or function(which is also object)    

      //initially I used memory based questions array, now I retrieve from Firebase
      // var questions =
      // [{
      //   label: "Ruby",
      //   desc: "Dynamic Language",
      //   childNodes: 
      //   [
      //      {
      //        label: "Ruby question 1",
      //        desc: "Tricky Question",
      //        link: "https://repl.it/HJOC/0",
      //        childNodes: 
      //        [
      //          {
      //           label: "Ruby question 1.1",
      //           desc: "Tricky Question",
      //           link: "http://www.oracle.com"
      //          }
      //        ]
      //      },
      //      {
      //        label: "Ruby question 2",
      //        desc: "Tricky Question",
      //        link: "https://www.google.com"
      //      }
      //   ]
      // },{
      //   label: "JavaScript",
      //   desc: "Web Language",
      //   childNodes: 
      //   [
      //      {
      //        label: "JS question 1",
      //        desc: "Tricky Question",
      //        link: "https://repl.it/HJOC/0",
      //        childNodes: 
      //        [
      //          {
      //           label: "JS question 1.1",
      //           desc: "Tricky Question",
      //           link: "http://www.oracle.com"
      //          }
      //        ]
      //      },
      //      {
      //        label: "JS question 2",
      //        desc: "Tricky Question",
      //        link: "https://www.google.com"
      //      }
      //   ]
      // },{
      //   label: "Java",
      //   desc: "structure language",
      //   childNodes: 
      //   [
      //      {
      //        label: "Java question 1",
      //        desc: "Tricky Question",
      //        link: "https://repl.it/HJOC/0",
      //        childNodes: 
      //        [
      //          {
      //           label: "Java question 1.1",
      //           desc: "Tricky Question",
      //           link: "http://www.oracle.com"
      //          }
      //        ]
      //      },
      //      {
      //        label: "Java question 2",
      //        desc: "Tricky Question",
      //        link: "https://www.google.com"
      //      }
      //   ]
      // }];
     
  
      //var fireQuestions = firebase.database().ref('questions');
      //console.log(fireQuestions.length);  //show undefined fireQuestions is not a normal array
      //Array.prototype.push.apply(fireQuestions, questions); //array merge for normal js, 2nd array is merged into 1st array, but fireQuestions is not a normal js array
      
      // var questions = []
      // fireQuestions.once('value',function(snap) {
      //     snap.forEach(function(item) {
      //       questions.push(item.val());
      //     });     
      // });
  
      // fireQuestions.push({
      //   label: "Java",
      //   desc: "good language"
      // });
      
      // http://stackoverflow.com/questions/25538400/firebase-how-to-extract-values-from-snapshot-object
      // http://stackoverflow.com/questions/41427859/get-array-of-items-from-firebase-snapshot
      // https://howtofirebase.com/save-and-query-firebase-data-ed73fb8c6e3a
  
      //in firebase console, for name field, 
      //when type number, considered as array index (has to start from 0, otherwise the place filler is null value), 
      //when type string, considered as object property
 /*********************************************************************************/ 
      function QuestionBank() {
        var colorHandler = new oj.ColorAttributeGroupHandler();  //needs both 'ojs/ojcore', 'ojs/ojsunburst' library for this to work
        var questions = [];
        var parentNode = {};
        this.questionUrlMapper = {};
        self = this;
        this.retrieveNodesFromFirebase = retrieveNodesFromFirebase;
            
        //instance methods
        function retrieveNodesFromFirebase() {
         return new Promise((resolve, reject) => {
           var fireQuestions = firebase.database().ref('questions');
           fireQuestions.once('value',function(snap) {
              snap.forEach(function(item) {
                questions.push(item.val());
              }); 
              goThroughQuestions(questions, parentNode);
              resolve(parentNode.nodes);
           });
         });
        }
        
        //private methods:
        function goThroughQuestions(childNodes, parentNode) { //recursive method
          var nodes = [];
          for(var i = 0; i < childNodes.length; i++) {
            var node = createNode(childNodes[i].label, childNodes[i].desc);
            self.questionUrlMapper[childNodes[i].label] = childNodes[i].link; // use self because it's in the fireQuesitons.once's method's callback function, or you can use arrow function as callback function
            nodes.push(node);
            if(childNodes[i].childNodes && childNodes[i].childNodes.length) {
              goThroughQuestions(childNodes[i].childNodes, node);
            }
          }
          addChildNodes(parentNode, nodes);
        }

        function createNode(label, desc) {
          return {label: label,
                id: label,
                value: getValue(),
                color: getColor(),
                shortDesc: "&lt;b&gt;" + label + 
                  "&lt;/b&gt;&lt;br/&gt;" + desc};
        }

        function addChildNodes(parent, childNodes) {
          parent.nodes = [];
          for (var i = 0; i < childNodes.length; i++) {
            parent.nodes.push(childNodes[i]);
          }
        }

        function getValue() {
          return Math.round(50 + 50 * Math.random());
        }

        function getColor() {
          return colorHandler.getValue(Math.floor(Math.random() * 100));
        }
        
      }
    
      return new QuestionBank();

      console.log("question bank loaded\n\
      ===========================================================================");  
  // });
});