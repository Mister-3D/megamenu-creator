$(document).mouseup(function (e){
    var container = $(".has-subcontent");
    // if the target of the click isn't the container nor a descendant of the container
    // or also another ".has-subcontent" item
    if(!container.is(e.target) && container.has(e.target).length === 0){
        container.find(".subcontent-item").removeClass("subcontent-item-active");
        container.find(".subcontent-item-toggle").removeClass("subcontent-item-toggle-active");
    }
});


// subcontent-item-toggle-click
$(document).on('click', '.subcontent-item-toggle-click', function(){
   toggleSubcontentItemDisplay(this, "before");
});

$(document).on('click', '.subcontent-item .display-toggle-trigger', function(){
   toggleSubcontentItemDisplay(this, "");
});
 

function toggleSubcontentItemDisplay(toggler, togglerPosition){

    $(toggler).find(".icon-dir-down").toggleClass('rot-180-acw');
    $(toggler).find(".icon-dir-right").toggleClass('rot-180-acw');


    // subcontent IS IN THE SAME CONTAINER with subcontentToggler
    if(togglerPosition == "before"){
        var subcontentItem = $(toggler).next();
        var subcontentItemParent = $(toggler).parent();
        subcontentItemParent.toggleClass("active-item");
    }
    else{
      // subcontent IS NOT IN THE SAME CONTAINER, so we are targeting a specific element with a given unique "id"
      var target = $(toggler).attr('display-toggle-subcontent-component');
      if((target == "") || (target == undefined)){
        }
      else{var subcontentItem = $(target);}
    }


    // THIS FINDS AND CLEARS OUT ALL ACTIVE SUBCONTENT ITEMS ON THE PAGE, SAVE THIS CURRENT ONE
    var no_of_elmts = $(document).find(".subcontent-item-active").length;
    for(y = 0; y < no_of_elmts; y++){
        var this_active_subcontent = $(document).find(".subcontent-item-active")[y];
        
        if($(this_active_subcontent)[0] == $(subcontentItem)[0]){
          // console.log("Yes Match");
          // 
        }
        else{ 
          // console.log("No");
          $(this_active_subcontent).removeClass("subcontent-item-active");
         }
    }

    //
    if($(subcontentItem).hasClass("subcontent-item")){
     
      if($(subcontentItem).hasClass("subcontent-slide-down")){

          // accordion-list-togglable
          var subcontentListType = $(subcontentItem).parents(".list");
          if($(subcontentListType).hasClass("accordion-list-togglable")){
              var no_of_elmts = $(subcontentListType).find(".subcontent-item").length;
              for(s = 0; s < no_of_elmts; s++){
                  var this_active_subcontent = $(subcontentListType).find(".subcontent-item")[s];
                  
                  if($(this_active_subcontent)[0] == $(subcontentItem)[0]){
                      $(subcontentItem).slideToggle("fast");
                  }
                  else{ 
                    // console.log("No");
                    $(this_active_subcontent).slideUp("fast");
                    $(this_active_subcontent).parents(".has-subcontent").removeClass("active-item");
                    var togg = $(this_active_subcontent).prev()[0];
                    $(togg).removeClass("subcontent-item-toggle-active");
                   }
              }     
          }
          else{
             $(subcontentItem).slideToggle("fast");
             $(subcontentItem).toggleClass("subcontent-item-active");
          }
      }
      else{  
          $(subcontentItem).toggleClass("subcontent-item-active");
      }
    }
    else{}

    $(toggler).toggleClass("subcontent-item-toggle-active");


}


function runSubcontentToggleResponsiveness(version, givenComponent){
      if(version == "desktop"){
          $(givenComponent).find(".subcontent-item").show();
          $(givenComponent).find(".subcontent-item").removeClass("subcontent-item-shown");
          // 
          $(givenComponent).find(".subcontent-item-toggle-responsive").removeClass("subcontent-item-toggle-click");
          $(givenComponent).find(".subcontent-item-toggle-responsive").addClass("subcontent-item-toggle-hover");
          //
          $(givenComponent).find(".subcontent-up-responsive").addClass("subcontent-up");
          $(givenComponent).find(".subcontent-right-responsive").addClass("subcontent-right");
          $(givenComponent).find(".subcontent-down-responsive").addClass("subcontent-down");
          $(givenComponent).find(".subcontent-left-responsive").addClass("subcontent-left");
          $(givenComponent).find(".subcontent-fade-in-up-responsive").addClass("subcontent-fade-in-up");
          $(givenComponent).find(".subcontent-fade-in-right-responsive").addClass("subcontent-fade-in-right");
          $(givenComponent).find(".subcontent-fade-in-down-responsive").addClass("subcontent-fade-in-down");
          $(givenComponent).find(".subcontent-fade-in-left-responsive").addClass("subcontent-fade-in-left");
          $(givenComponent).find(".subcontent-slide-in-up-responsive").addClass("subcontent-slide-in-up");
          $(givenComponent).find(".subcontent-slide-in-right-responsive").addClass("subcontent-slide-in-right");
          $(givenComponent).find(".subcontent-slide-in-down-responsive").addClass("subcontent-slide-in-down");
          $(givenComponent).find(".subcontent-slide-in-left-responsive").addClass("subcontent-slide-in-left");
          //
          $(givenComponent).find(".subcontent-up-responsive").removeClass("subcontent-slide-down");
          $(givenComponent).find(".subcontent-right-responsive").removeClass("subcontent-slide-down");
          $(givenComponent).find(".subcontent-down-responsive").removeClass("subcontent-slide-down");
          $(givenComponent).find(".subcontent-left-responsive").removeClass("subcontent-slide-down");
          $(givenComponent).find(".subcontent-fade-in-up-responsive").removeClass("subcontent-slide-down");
          $(givenComponent).find(".subcontent-fade-in-right-responsive").removeClass("subcontent-slide-down");
          $(givenComponent).find(".subcontent-fade-in-down-responsive").removeClass("subcontent-slide-down");
          $(givenComponent).find(".subcontent-fade-in-left-responsive").removeClass("subcontent-slide-down");
          $(givenComponent).find(".subcontent-slide-in-up-responsive").removeClass("subcontent-slide-down");
          $(givenComponent).find(".subcontent-slide-in-right-responsive").removeClass("subcontent-slide-down");
          $(givenComponent).find(".subcontent-slide-in-down-responsive").removeClass("subcontent-slide-down");
          $(givenComponent).find(".subcontent-slide-in-left-responsive").removeClass("subcontent-slide-down");
      }
      else{
            $(givenComponent).find(".subcontent-item").hide();
            $(givenComponent).find(".subcontent-item").addClass("subcontent-item-shown");
            //
            $(givenComponent).find(".subcontent-item-toggle-responsive").removeClass("subcontent-item-toggle-hover");
            $(givenComponent).find(".subcontent-item-toggle-responsive").addClass("subcontent-item-toggle-click");
            //
            $(givenComponent).find(".subcontent-up-responsive").removeClass("subcontent-up");
            $(givenComponent).find(".subcontent-right-responsive").removeClass("subcontent-right");
            $(givenComponent).find(".subcontent-down-responsive").removeClass("subcontent-down");
            $(givenComponent).find(".subcontent-left-responsive").removeClass("subcontent-left");
            $(givenComponent).find(".subcontent-fade-in-up-responsive").removeClass("subcontent-fade-in-up");
            $(givenComponent).find(".subcontent-fade-in-right-responsive").removeClass("subcontent-fade-in-right");
            $(givenComponent).find(".subcontent-fade-in-down-responsive").removeClass("subcontent-fade-in-down");
            $(givenComponent).find(".subcontent-fade-in-left-responsive").removeClass("subcontent-fade-in-left");
            $(givenComponent).find(".subcontent-slide-in-up-responsive").removeClass("subcontent-slide-in-up");
            $(givenComponent).find(".subcontent-slide-in-right-responsive").removeClass("subcontent-slide-in-right");
            $(givenComponent).find(".subcontent-slide-in-down-responsive").removeClass("subcontent-slide-in-down");
            $(givenComponent).find(".subcontent-slide-in-left-responsive").removeClass("subcontent-slide-in-left");
            //
            $(givenComponent).find(".subcontent-up-responsive").addClass("subcontent-slide-down");
            $(givenComponent).find(".subcontent-right-responsive").addClass("subcontent-slide-down");
            $(givenComponent).find(".subcontent-down-responsive").addClass("subcontent-slide-down");
            $(givenComponent).find(".subcontent-left-responsive").addClass("subcontent-slide-down");
            $(givenComponent).find(".subcontent-fade-in-up-responsive").addClass("subcontent-slide-down");
            $(givenComponent).find(".subcontent-fade-in-right-responsive").addClass("subcontent-slide-down");
            $(givenComponent).find(".subcontent-fade-in-down-responsive").addClass("subcontent-slide-down");
            $(givenComponent).find(".subcontent-fade-in-left-responsive").addClass("subcontent-slide-down");
            $(givenComponent).find(".subcontent-slide-in-up-responsive").addClass("subcontent-slide-down");
            $(givenComponent).find(".subcontent-slide-in-right-responsive").addClass("subcontent-slide-down");
            $(givenComponent).find(".subcontent-slide-in-down-responsive").addClass("subcontent-slide-down");
            $(givenComponent).find(".subcontent-slide-in-left-responsive").addClass("subcontent-slide-down");
      }
}
 












 