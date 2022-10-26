  // for all modal-toggles
  $(".modal-toggle").click(function(){
    toggleTargetModal(this);
  });  
  $(".modal-toggle-item").click(function(){
    toggleTargetModal(this);
  });
  // for all modal-openers 
  $(".modal-opener").click(function(){
    toggleTargetModal(this);
  }); 

  //
  function toggleTargetModal(targetModalBtn){
    var target = $(targetModalBtn).attr('modal-target-component');
    if((target == "") || (target == undefined)){
    }
    else{toggleModal(target);}
  }
  //
  function toggleModal(target){
    // we get the modal-toggle in the target
    var modal_toggle = $(target).find(".modal-toggle");
    // we set the "modal-target-component" value of the modal-toggle
    $(modal_toggle).attr('modal-target-component', target);

    // this is for classes with "slideIn"
     if($(target).hasClass("slideInRight")){
      $(target).toggleClass("slideInRight-active");
      }
      else if($(target).hasClass("slideInLeft")){
        $(target).toggleClass("slideInLeft-active");
      }
      else if($(target).hasClass("slideInUp")){
        $(target).toggleClass("slideInUp-active");
      }
      else if($(target).hasClass("slideInDown")){
        $(target).toggleClass("slideInDown-active");
      }
      else{$(target).fadeToggle("slow");}
   
      
  }

  $(".modal-backdrop").click(function(){
    toggleModal($(this).parents(".modal"));
  });
