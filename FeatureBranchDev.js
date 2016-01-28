(function(){
/***********************
 *  CUSTOM TEMPLATES   *
 ***********************/

var myTemplateConfig = {
        colors: [ "#696969", "#008fb5", "#f1c109" ], // branches colors, 1 per column
        branch: {
          lineWidth: 10,
          spacingX: 50
        },
        commit: {
          spacingY: -80,
          dot: {
            size: 14
          },
    message: {
      displayAuthor: true,
      displayBranch: true,
      displayHash: false,
      font: "normal 14pt Arial"
    },
    tooltipHTMLFormatter: function ( commit ) {
      return "<b>" + commit.sha1 + "</b>" + ": " + commit.message;
    }
  }
};
var myTemplate = new GitGraph.Template( myTemplateConfig );


/***********************
 *    INITIALIZATION   *
 ***********************/

var config = {
  template: myTemplate,
  orientation: "horizontal",
  //,orientation: "horizontal" //Orientation
  author: "DA-Dev" //Defaulkt commiter if no other is specified
  //, mode: "compact"     // special compact mode : hide messages & compact graph
};
var gitGraph = new GitGraph( config );
/***********************
 * BRANCHS AND COMMITS *
 ***********************/

// Create branch named "master"
var master = gitGraph.branch( "master" );
// Create commit type Commit on HEAD Branch which is "master"
var genCommit = {
  messageAuthorDisplay:true,
  messageBranchDisplay:true,
  messageHashDisplay:false,
  message:"Story Commit",
  dotColor: "#979797",
  onClick: function ( commit ) {
    var self = this;
    // Checkout specefic commit
    //gitGraph.Checkout(branch);
    //for (prop in self) { console.log(prop);}
    self.branch.checkout();
  }
};
var branchCreateCommit = Object.create(genCommit);
branchCreateCommit.message = "branch created";
var testCommit = Object.create(genCommit);
testCommit.author = "Tester";
testCommit.dotColor = "#b20000";


gitGraph.commit( "FR-1 start" );
// Perform series of commits to master
//master.commit("OLCF and OLSS version updated to latest");
//master.commit("All Build issues resolved");
//Feature branch
//var devFeature = gitGraph.branch( "CDS2MSDA-82" );
//devFeature.commit( "CDS2MSDA-82 Feature Branch created" );

/***********************
 * Add events/listeners *
 ***********************/

gitGraph.canvas.addEventListener( "commit:mouseover", function ( event ) {
  console.log( "You're over a commit.", event.data );
} );
//JQuery listener for submit
$(document).ready(function(){
$('#btnSubmit').click(function() {
  if ( $( "#nBranch" ).val() ){
  console.log("I tried branchstuff");
  gitGraph.branch($( "#nBranch" ).val());
  gitGraph.commit(branchCreateCommit);
  }
});

$('#mergeIn').click(function() {
  if (gitGraph.HEAD.name === "master") {
    console.log("Pick a branch first");
    return;
  } else{
    gitGraph.HEAD.merge(master,{ message: "Feature complete",
      author: "DA-Dev"});
  }
});

$('#Tcommit').click(function() {
  gitGraph.commit(testCommit);
  });

});

/***********************
 * Expose Branch and functions, hacked together*
 ***********************/
window.currGraph = gitGraph;
window.addCommit = function() {
  gitGraph.commit(genCommit);
};
window.branchOFF = function(){
  gitGraph.branch("");
};

}());

