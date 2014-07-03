function(){

   //checks the parent of the elements if the required element exists
   //returns "invalid" if a negative element was found within direct line of DOM object
   //returns .returnVal parameter if the required element exists.
   try {
		
		//stops the loop if the "body" type element is reached
		var isTopElement = false;
		//emergency stop if something in the loop fails
		var cter = 0;
		
		//new elements can be included in the array below
		//type of name evaluation (class or id or onclick), name of element and return value
		//are needed that the element is tracked properly 
		var elementTypes = [
			{'type': 'onclick', 'name': 'chooseBillingAddress', 'returnVal': 'buttonBilling'},
			{'type': 'onclick', 'name': 'chooseShippingAddress', 'returnVal': 'buttonShippingAddress'},
			{'type': 'onclick', 'name': 'shippingMethod', 'returnVal': 'buttonShippingMethod'},
			{'type': 'onclick', 'name': 'savePayment', 'returnVal': 'buttonSavePayment'},
			{'type': 'onclick', 'name': 'review.save', 'returnVal': 'buttonReviewOrder'},
            {'type': 'class', 'name': 'button btn-cart', 'returnVal': 'buttonAddToCart'}
		];
		
		//defines the elements that trigger an abort (click on non interesting element)
		var negativeElements = [
			{'type': 'class', 'name': 'tabLeft'},
			{'type': 'class', 'name': 'tabRight'}
		]
		
		var currentElement = {{element}};
		
		//starts the loop, which bubbles upwards and checks if the type and name
		//of a DOM element concurs with the parameters in the elementTypes array
		while (!isTopElement && cter < 100){
			
			//checks the HTML-element for elements in the negative array
			for (var i=0; i < negativeElements.length; i++){
				if (currentElement.getAttribute(elementTypes[i].type) == elementTypes[i].name){
					return "invalid";
				}
			}
			
			
			//checks the HTML-element for each element in the array
			for (var i=0; i < elementTypes.length; i++){
				
				//set element text to avoid error with .indexOf method
				var currentElementAttributeText = currentElement.getAttribute(elementTypes[i].type) == null ? "" : currentElement.getAttribute(elementTypes[i].type);
				
				if (currentElementAttributeText.indexOf(elementTypes[i].name)>-1){
					return elementTypes[i].returnVal;
				}
			}
			
			//is it time to stop the loop?
			cter++;
			if (currentElement.nodeName.indexOf("BODY") > -1){
				isTopElement = true;
			}
			
			//climb up a hierarchy-level
			currentElement = currentElement.parentNode;
		}
		return "invalid";
	}
	
	catch(e){
	    return "invalid";
	}
}
