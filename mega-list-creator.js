

//

// html items names:
/*
 
button: #save_new_menu_name
button: #save_root_menu_items

*/

let allMenus = [];
// step 1
document.querySelector("#save_new_menu_name").addEventListener('click', function(){
 	var input_new_menu_name = document.querySelector("#new_menu_name");
 	if((input_new_menu_name.value) == ""){
 		alert("please enter a name");
 		input_new_menu_name.focus();

 	}else{
 		createNewMenuObject(input_new_menu_name.value);
 		moveToTargetChild("exampleID", 2);
 	}
});

// step 2
document.querySelector("#save_root_menu_items").addEventListener('click', function(){
 	var textarea_root_menu_items = document.querySelector("#root_menu_items");
 	//
 	if((String(textarea_root_menu_items.value).length) == 0){
 		alert("please enter an item");
 		textarea_root_menu_items.focus();

 	}else{
 		// createNewMenuObject(textarea_root_menu_items.value);
 		// moveToTargetChild("exampleID", 2);
 		addRootMenuItemsToMenuObject(document.querySelector("#thisMenuID").value, convertStringWithDelimeterToArray("|", textarea_root_menu_items.value));
 		// we set the details 
 		let menuObject = getMenuObjectByID(document.querySelector("#thisMenuID").value);
 		setListDetailsOnTarget("targetWrapperElt", document.querySelector("#thisMenuID").value, "listItemID",  1);

 	}
});




function createNewMenuObject(menuName){
	let newMenuItemID = "menu" + String(Math.floor(Math.random() * 1000000000) + 1);
	let newMenuItem = {
		"name": menuName,
		"id": newMenuItemID,
		"allListItems":[],
		"allLevelsArraysList":[]
	};
	//
	allMenus.push(newMenuItem);
	// set value to an input
	document.querySelector("#thisMenuID").value = newMenuItemID;
	console.log("Added New Item:");
	console.log(allMenus);
}

function addRootMenuItemsToMenuObject(menuItemID, rootMenuArray){
	let menuObject = getMenuObjectByID(menuItemID);
	if(menuObject != null){
		for( var p = 0; p < rootMenuArray.length; p++){
			let rootItemObj = createNewListItemObject(rootMenuArray[p], p, 1);
			let rootItemObjID = rootItemObj.id;
			//
			let itemsArray = menuObject.allListItems;
			itemsArray.push(rootItemObj);
			menuObject.allListItems = itemsArray;
			//
			saveNewLevelItems(1, rootItemObjID, menuItemID);
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


function setListDetailsOnTarget(targetWrapperElt, menuItemID, listItemID, listLevel){
	// we save all the selectors in an array 
	let detailItemsSelectorsArray = ["listsTemplateElement", "list_text", "list_breadcrumb", "list_subitems_count", "list_level_count", "listSubitemsULWrapper"];
	let detailsItemsSelectors = {};
	for( var c = 0; c < detailItemsSelectorsArray.length; c++){
		detailsItemsSelectors[detailItemsSelectorsArray[c]] = document.querySelector("." + detailItemsSelectorsArray[c]);
	}
	console.log(detailsItemsSelectors);
	// levelArray
	let selectedLevelArray = [];
	let listItemObj = {};
	
	let menuObject = getMenuObjectByID(menuItemID);
	if(menuObject != null){
		let allLevelsArraysList = menuObject.allLevelsArraysList;
		selectedLevelArray = allLevelsArraysList[listLevel - 1];	
		// 
		if(listLevel != 1){
			listItemObj = getListItemObjectByID(listItemID);
			detailsItemsSelectors.list_text.innerHTML = "Desola";
		}else{
			detailsItemsSelectors.list_text.innerHTML = "Rooters";
			var targetWrapperElt = "targetWrapperElt";
			var menuItemID = "menuItemID";
			var listItemID = "listItemID";
			var listLevel = "listLevel";
			// detailsItemsSelectors.list_breadcrumb.innerHTML = `<li onClick='setListDetailsOnTarget(${targetWrapperElt}, ${menuItemID}, ${listItemID}, ${listLevel})'><span class="mr-25">Root</span></li>`;
			detailsItemsSelectors.list_breadcrumb.innerHTML = "<li onClick='setListDetailsOnTarget( " +  "3" + ", " +  "3" + "," +  "3" + "," +  "3" + ",)'><span class='mr-25'>Root</span></li>";

		}

	}



}

function doingAction(Item){
	console.log("Doing Something");
	console.log(Item);
}

// setListDetailsOnTarget(targetWrapperElt, menuItemID, listItemID, listLevel);
