

// 

// html items names:
/*
 
button: #save_new_menu_name
button: #save_new_list_items

*/

let allMenus = [];

// step 1: add the menu name
document.querySelector("#save_new_menu_name").addEventListener('click', function(){
 	var input_new_menu_name = document.querySelector("#new_menu_name");
 	if((input_new_menu_name.value) == ""){
 		alert("please enter a name");
 		input_new_menu_name.focus();

 	}else{
 		createNewMenuObject(input_new_menu_name.value);
 		toggleModal("#addNewItemsModal");
 		document.querySelector("#addNewItemsModal").querySelector("#addNewItemsModalLabel").innerHTML = "Add Items for the Root level";
 	}
});

// step 2: get the list of items you add (for the root level....at first)
document.querySelector("#save_new_list_items").addEventListener('click', function(){
 	var textarea_new_list_items = document.querySelector("#new_list_items");
 	let targetListLevel  = textarea_new_list_items.getAttribute("targetListLevel");
 	let currentSelectedMenuID = 	document.querySelector("#currentSelectedMenuID").value;
 	let currentListItemID  = textarea_new_list_items.getAttribute("currentListItemID");
 	//
 	if((String(textarea_new_list_items.value).length) == 0){
 		alert("please enter an item");
 		textarea_new_list_items.focus();

 	}else{
 		addNewListItemsToMenuObject(document.querySelector("#currentSelectedMenuID").value, convertStringWithDelimeterToArray("|", textarea_new_list_items.value), currentListItemID, targetListLevel);
 		console.log("Added New List Item");
 		console.log(allMenus);
 		setListDetailsOnTarget(currentSelectedMenuID, currentListItemID, targetListLevel);
 	  //
 	  toggleModal("#addNewItemsModal");
 	}
});

// 
document.querySelector("#addSubItemTrigger").addEventListener('click', function(){
 	let targetListLevel  = this.getAttribute("targetListLevel");
 	let currentListItemID  = this.getAttribute("currentListItemID");
 	//
 	let textarea_new_list_items = document.querySelector("#new_list_items");
 	textarea_new_list_items.value = "";
 	textarea_new_list_items.setAttribute("targetListLevel", targetListLevel);
 	textarea_new_list_items.setAttribute("currentListItemID", currentListItemID);
 	//
 	toggleModal("#addNewItemsModal");
});

//
document.querySelector(".generateMenuHTMLTextTrigger").addEventListener('click', function(){
 	let menuObject = getMenuObjectByID(document.querySelector("#currentSelectedMenuID").value);
	if(menuObject != null){
 		displayThisMenuText(menuObject);
 	}else{
 		console.log("No menu found");
 	}
});



function createNewMenuObject(menuName){
	let newMenuItemID = "menu" + String(Math.floor(Math.random() * 1000000000) + 1);
	let newMenuItem = {
		"name": menuName,
		"id": newMenuItemID,
		"allListItems":[],
		"allLevelsArraysList":[],
		"allSubcontentTexts":[]
	};
	//
	allMenus.push(newMenuItem);
	// set value to an input
	document.querySelector("#currentSelectedMenuID").value = newMenuItemID;
	console.log("Added New Item:");
	console.log(allMenus);
}

function addNewListItemsToMenuObject(menuItemID, newListItems, listItemID, targetListLevel){
	let menuObject = getMenuObjectByID(menuItemID);
	if(menuObject != null){
		for( var p = 0; p < newListItems.length; p++){
			let newListItemObj = createNewListItemObject(newListItems[p], p, Number(targetListLevel));
			let newListItemObjID = newListItemObj.id;
			//
			let itemsArray = menuObject.allListItems;

			if(listItemID != "rootID"){
				// add items to their parent
				let parentListItemObj = getListItemObjectByID(menuItemID, listItemID);
				let parentListItemObjIndex = getListItemObjectIndexByID(menuItemID, listItemID);
				parentListItemObj.children.push(newListItemObjID);
				// set parent in items
				newListItemObj.parent = listItemID;
				itemsArray[parentListItemObjIndex] = parentListItemObj;
			}
			//
			itemsArray.push(newListItemObj);
			//
			menuObject.allListItems = itemsArray
			//
			saveNewLevelItems(Number(targetListLevel), newListItemObjID, menuItemID);
			//
			allMenus[getMenuObjectIndexByID(menuItemID)] = menuObject;

		}

	}
}



function convertStringWithDelimeterToArray(delimeter, fullString){
	let stringConversion = fullString.replace(/\s/g,'');
	// '|'
	stringConversion = stringConversion.split(delimeter);
	return stringConversion;
}


function createNewListItemObject(itemText, position, level){
	let newListItemObject = {};
	newListItemObject.id = "item" + String(Math.floor(Math.random() * 1000000000) + 1);
	newListItemObject.text = itemText;
	newListItemObject.subListText = "";
	newListItemObject.levelPosition = position;
	newListItemObject.type = "";
	newListItemObject.level = level;
	newListItemObject.parent = "";
	newListItemObject.children = [];
	// 
	return newListItemObject;
}
function addNewListItemObject(newListItemObject){

}


function saveNewLevelItems(level, levelItemID, menuItemID){

	let menuObject = getMenuObjectByID(menuItemID);
	if(menuObject != null){
		//
		let allLevelsArraysList = menuObject.allLevelsArraysList;
		// check if its not empty
		let thisLevelArray = [];
		if((allLevelsArraysList[Number(level) - 1]) != undefined){
			thisLevelArray = allLevelsArraysList[Number(level) - 1];
			thisLevelArray.push(levelItemID);
			allLevelsArraysList[Number(level) - 1] = thisLevelArray;
		}else{
			thisLevelArray.push(levelItemID);
			allLevelsArraysList.push(thisLevelArray);
		}
		menuObject.allLevelsArraysList = allLevelsArraysList;
		allMenus[getMenuObjectIndexByID(menuItemID)] = menuObject;
	}

}

function getMenuObjectByID(givenID){
	let itemToGet = {};
	for(var h = 0; h < allMenus.length; h++){
		let thisItem = allMenus[h];
		if(thisItem.id == givenID){ 
			itemToGet = thisItem;
		}else{
			itemToGet = null;
		}
	}
	return itemToGet;
}

function getMenuObjectIndexByID(givenID){
	let itemToGetIndex = 0;
	for(var h = 0; h < allMenus.length; h++){
		let thisItem = allMenus[h];
		if(thisItem.id == givenID){ 
			itemToGetIndex = h;
		}else{
			itemToGetIndex = -1;
		}
	}
	return itemToGetIndex;
}
function getListItemObjectIndexByID(menuItemID, listItemID){
	let menuObject = getMenuObjectByID(menuItemID);
	let listObjectsArray = menuObject.allListItems;

	let itemToGetIndex = 0;
	for(var u = 0; u < listObjectsArray.length; u++){
		let thisItem = listObjectsArray[u];
		if(thisItem.id == listItemID){ 
			itemToGetIndex = u;
		}else{
			itemToGetIndex = -1;
		}
	}
	return itemToGetIndex;
}


function getListItemObjectByID(menuItemID, listItemID){
	let menuObject = getMenuObjectByID(menuItemID);
	let listObjectsArray = menuObject.allListItems;
	let listObject = {};
	
	let LoopSearchInArrayResult = LoopSearchInArray(listItemID, "id", listObjectsArray);
	if(LoopSearchInArrayResult != null){
		listObject = LoopSearchInArrayResult.item;
	}else{
		listObject = null;
	}
	//
	return listObject;
}


// I want to generalise this loop usage, since what we are searching for is like strings comparison
// keyIdentifier: "none" or a given value
// if its NOT none, then the inner item in the array is an object
function LoopSearchInArray(whatToFind, keyIdentifier, arrayToSearch){
	
	let whatToReturn = null;
	let valueToCompare = "";
	for( var indexCount = 0; indexCount < arrayToSearch.length; indexCount++){
			let thisArrayItem = arrayToSearch[indexCount];
			if(keyIdentifier != "none"){
				// i.e if its an "Object"
				valueToCompare = thisArrayItem[keyIdentifier];
			}else{
				// i.e. if its just a normal "String"
				valueToCompare = thisArrayItem;
			}

			if(String(valueToCompare) == String(whatToFind)){
				whatToReturn = {};
				whatToReturn.item = thisArrayItem;
				whatToReturn.itemIndex = indexCount;
			}
	}
	// it returns an object
	return whatToReturn;
}


function setListDetailsOnTarget(menuItemID, listItemID, listLevel){

	//listsTemplateElement: is what we want to use in this case to be displaying stuffs
	let targetValue = document.querySelector(".listsTemplateElement").getAttribute("targetValue");

	// we save all the selectors in an array 
	let detailItemsSelectorsArray = ["listsTemplateElement", "list_text", "list_breadcrumb", "list_subitems_count", "list_level_count", "listSubitemsUL"];
	let detailsItemsSelectors = {};
	for( var c = 0; c < detailItemsSelectorsArray.length; c++){
		detailsItemsSelectors[detailItemsSelectorsArray[c]] = document.querySelector("." + detailItemsSelectorsArray[c]);
	}

	// levelArray
	let selectedLevelArray = [];
	let listItemObj = {};
	
	let menuObject = getMenuObjectByID(menuItemID);
	if(menuObject != null){
		let allLevelsArraysList = menuObject.allLevelsArraysList;
		selectedLevelArray = allLevelsArraysList[listLevel - 1];	
		// 
		// general items
		
		detailsItemsSelectors.list_level_count.innerHTML = listLevel;
		if(listLevel != 1){
			listItemObj = getListItemObjectByID(menuItemID, listItemID);
			detailsItemsSelectors.list_text.innerHTML = listItemObj.text;
			detailsItemsSelectors.list_breadcrumb.innerHTML = generateBreadcrumbList(listItemID, Number(listItemObj.level) + 1, menuItemID);
			detailsItemsSelectors.list_subitems_count.innerHTML = listItemObj.children.length;
			detailsItemsSelectors.listSubitemsUL.innerHTML = generateListItems(listItemObj.children, menuItemID);
			// 
			document.querySelector("#addSubItemTrigger").setAttribute("targetListLevel", Number(listItemObj.level) + 1);
 			document.querySelector("#addSubItemTrigger").setAttribute("currentListItemID", listItemObj.id);
			
		}else{
			detailsItemsSelectors.list_text.innerHTML = "Root Menu";
			detailsItemsSelectors.list_breadcrumb.innerHTML = generateBreadcrumbList(listItemID, listLevel, menuItemID);
			detailsItemsSelectors.list_subitems_count.innerHTML = allLevelsArraysList[0].length;
			detailsItemsSelectors.listSubitemsUL.innerHTML = generateListItems(allLevelsArraysList[0], menuItemID);
			// 
			document.querySelector("#addSubItemTrigger").setAttribute("targetListLevel", 1);
 			document.querySelector("#addSubItemTrigger").setAttribute("currentListItemID", "rootID");
		}

	}


	// Go to 
	moveToTargetChild("exampleID", targetValue);


}

function generateBreadcrumbList(listItemID, listItemLevel, menuItemID){

	// "";
	let breadcrumbItems = [];
	let breadcrumbItemsString = "";
	let clickParametersString = "";
	let itemText = "";

	if((listItemID == "rootID") && (listItemLevel == 1)){
			breadcrumbItems.push("rootID");
	}
	else{
			let listObject = getListItemObjectByID(menuItemID, listItemID);
			let listParentID = listObject.parent;
			//
			breadcrumbItems.push(listItemID);
			//
			while(listParentID != ""){
				 let listObjectParent = getListItemObjectByID(menuItemID, listParentID);
				 let listParentIDLoop = listObjectParent.parent;
				 breadcrumbItems.push(listObjectParent.id);
				 listParentID = listParentIDLoop;
			}
			//
			breadcrumbItems.push("rootID");
	}

	// we reverse the order
	breadcrumbItems.reverse();


	for(var b = 0; b < breadcrumbItems.length; b++ ){
		//
		let thisBreadcrumbItemID = breadcrumbItems[b];
		//
		if(thisBreadcrumbItemID == "rootID"){
			clickParametersString = menuItemID + "," + "rootID" + "," + "1";
			itemText = "Root";
		}else{
			let thisBreadcrumbItemObject = getListItemObjectByID(menuItemID, thisBreadcrumbItemID);
			clickParametersString = menuItemID + "," + thisBreadcrumbItemID + "," + (Number(thisBreadcrumbItemObject.level) + 1);
			itemText = thisBreadcrumbItemObject.text;
		}
		let separator = `<li><span class="icon-feather-chevron-right mr-25"></span></li>`;
		let thisLi = `<li clickParameters="${clickParametersString}" onClick='listBreadcrumbItemOnClick(${"this"})'><span class='mr-25'>${itemText}</span></li>`;

		if(b == (breadcrumbItems.length - 1)){
			separator = "";
		}
		
		thisLi += separator;
		breadcrumbItemsString += thisLi;
	}

	return breadcrumbItemsString;
	
}
function listBreadcrumbItemOnClick(thisItem){
	let parameters = convertStringWithDelimeterToArray(",", thisItem.getAttribute("clickParameters"));
	setListDetailsOnTarget(parameters[0], parameters[1], parameters[2]);
}
function listSubitemsULItemOnClick(thisItem){
	let displayContainer = thisItem.getAttribute('modal-target-component');
	let viewTrigger = document.querySelector(displayContainer).querySelector("#viewTrigger");
	let editTrigger = document.querySelector(displayContainer).querySelector("#editTrigger");
	let deleteTrigger = document.querySelector(displayContainer).querySelector("#deleteTrigger");
	//
	viewTrigger.setAttribute("onClick", "viewItemSubLists(this)");
	viewTrigger.setAttribute("targetListLevel", thisItem.getAttribute("targetListLevel"));
 	viewTrigger.setAttribute("currentListItemID", thisItem.getAttribute("currentListItemID"));
	toggleModal(displayContainer);
}

function viewItemSubLists(thisListItem){
	setListDetailsOnTarget(
		document.querySelector("#currentSelectedMenuID").value, 
		thisListItem.getAttribute("currentListItemID"), 
		thisListItem.getAttribute("targetListLevel")
		);
	toggleModal("#listItemsOptionsModal");

}




function generateOnClickText(onclickFunction, parametersArray){
	let onclickFunctionString = "";
	let parametersString = "";
}

function generateListItems(itemsListIDs, menuItemID){
	let listsString = "" ;
	// 
	if(itemsListIDs.length != 0){
			for(var g = 0; g < itemsListIDs.length; g++){
				var thisItemID = itemsListIDs[g];
				let thisItemObj = getListItemObjectByID(menuItemID, thisItemID);
				var thisItemString = `
					<li>
		              <span class="li-child-item">
		              	<div class="flex-fill">	
		                   <div><span>${thisItemObj.text}</span></div>
		                   <div class="txt-fs-10" style="color: #ccc;"><span>${thisItemObj.children.length}</span> <span>items</span></div>
		                </div>
		                <span><i targetListLevel="${Number(thisItemObj.level) + 1}" currentListItemID="${thisItemObj.id}" onClick="listSubitemsULItemOnClick(${"this"})" modal-target-component="#listItemsOptionsModal" class="modal-toggle-item listItemOptionTrigger icon-feather-more-vertical"></i></span>
		              </span>
		            </li>

				`;
				listsString += thisItemString;
			}
	}else{
		listsString = "<div style='background-color: white;' class='p-2 pos-hor-center-fixed'><p>No SubItems Added Yet!</p></div>";
	}
	

	return listsString;
}

// setListDetailsOnTarget(menuItemID, listItemID, listLevel);


/*

Home | About | Services | Portfolio | Contact Us
*/ 

function findCommonElement(array1, array2) {
     
     let comparisonResult = [];

    // Loop for array1
    for(let i = 0; i < array1.length; i++) {
         
        // Loop for array2
        for(let j = 0; j < array2.length; j++) {
             
            // Compare the element of each and
            // every element from both of the
            // arrays
            if(array1[i] === array2[j]) {
             
                // Return if common element found
                let comparisonResultObject = {};
                comparisonResultObject.match = array1[i];
                comparisonResultObject.indexInFirst = i;
                comparisonResultObject.indexInSecond = j;
                comparisonResult.push(comparisonResultObject);
                // return true;
                // return true;
            }
        }
    }
     
    // Return if no common element exist
    return comparisonResult;
    // return false;
}


function getSubcontentTextForThisListItemID(listItemID, allSubcontentTexts){
    let itemText = "";
    for(var p = 0; p < allSubcontentTexts.length; p++){
        // we go through each level, and each item in each level to get match and its subcontentText
        let thisLevelArray = allSubcontentTexts[p];
        if(thisLevelArray.length == 0){

        }else{
            // get the items in the levelArray.
            for(var y = 0; y < thisLevelArray.length; y++){
                let gottenItemArrayObj = thisLevelArray[y];
                if(gottenItemArrayObj.id == listItemID){
                    itemText = gottenItemArrayObj.itemText;
                }
            }
        }
    }

    return itemText;
}



function displayThisMenuText(thisMenuObject){


        let thisMenuObjectID = thisMenuObject.id;
        let allLevelsArraysList = thisMenuObject.allLevelsArraysList;
        let allSubcontentTexts = thisMenuObject.allSubcontentTexts;


       // we loop through the "allLevelsArraysList" starting from the last level up to the top
       for (var n = (allLevelsArraysList.length - 1); n >= 0; n--){

            

              // create a new array for "allSubcontentTexts" to store the texts of this level
              let arrayForSubcontentLevel = [];

              let thisLevelArray = allLevelsArraysList[n];
              for(var b = 0; b < thisLevelArray.length; b++){
                 let thisLevelArrayItemID = thisLevelArray[b];
                 let thisListItemObject = getListItemObjectByID(thisMenuObjectID, thisLevelArrayItemID);
                 let thisListItemText = "<li>";
                 thisListItemText += "<span>" + thisListItemObject.text + "</span>"; 
                 if(thisListItemObject.children.length > 0){
                   
                    if(n == (allLevelsArraysList.length - 1)){
                       
                    }else{
                        thisListItemText += "<div>";
                        thisListItemText += "<ul>";
                        // check the lower level before this current level and check if thisItem has a child there
                        // we loop through its children array to check for a match 
                        let theChildren = thisListItemObject.children;
                        // we get the array of the lower level
                        // since this level index is n, its lower level will be n + 1;
                        let lowerLevelArray = allLevelsArraysList[Number(n+1)];    
                        // we compare the items in both array to see if there would be a match
                        let comparisonResults = findCommonElement(theChildren, lowerLevelArray);
                        
                        if(comparisonResults.length > 0){
                            // then there is a match/matches, for each match, we get their subcontentText
                            for(var l = 0; l < comparisonResults.length; l++){
                                let itemSubcontentText = getSubcontentTextForThisListItemID(comparisonResults[l].match, allSubcontentTexts);

                                thisListItemText += itemSubcontentText;
                            }

                        }
                        thisListItemText += "</ul>";
                        thisListItemText += "</div>";
                    }
                 }else{
                  
                 }
                 thisListItemText += "</li>";

                 // console.log("allSubcontentTexts");
                // console.log(allSubcontentTexts);
                
                 // create a new object for this id item to store in the "arrayForSubcontentLevel"
                 let arrayForSubcontentLevelItem = {};
                 arrayForSubcontentLevelItem.id = thisListItemObject.id;
                 arrayForSubcontentLevelItem.itemText = thisListItemText;
                 arrayForSubcontentLevel.push(arrayForSubcontentLevelItem);
              }

              // store it in the "allSubcontentTexts" array
              allSubcontentTexts.push(arrayForSubcontentLevel);
       }

       // after all the subcontents are prepared, we get the last array there
       let lastSubcontenTextsArray = allSubcontentTexts[allSubcontentTexts.length - 1];
       console.log(lastSubcontenTextsArray);
       let thisMenuFullText = "<ul>";
       for(var u = 0; u < lastSubcontenTextsArray.length; u++){
            thisMenuFullText += lastSubcontenTextsArray[u].itemText;
       }
       thisMenuFullText += "</ul>";
       console.log(thisMenuFullText);

       document.querySelector(".content").innerHTML = thisMenuFullText;
  	
  	   moveToTargetChild("exampleID", 4);

}