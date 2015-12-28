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
  template: myTemplate       // could be: "blackarrow" or "metro" or `myTemplate` (custom Template object)
  //,orientation: "horizontal" //Orientation
  ,author: "BM-person <goodBuild@agilent.com>" //Defaulkt commiter if no other is specified
  //, mode: "compact"     // special compact mode : hide messages & compact graph
};
var gitGraph = new GitGraph( config );
/***********************
 * BRANCHS AND COMMITS *
 ***********************/

// Create branch named "master"
var master = gitGraph.branch( "master" );
// Commit on HEAD Branch which is "master"
gitGraph.commit( "FR-1 start" );
// Perform series of commits to master
master.commit("OLCF and OLSS version updated to latest")
master.commit("All Build issues resolved")
//Feature branch
var devFeature = gitGraph.branch( "CDS2MSDA-82" );
devFeature.commit( "CDS2MSDA-82 Feature Branch created" );


