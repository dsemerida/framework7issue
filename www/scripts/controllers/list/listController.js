define(["scripts/controllers/list/listView", "scripts/controllers/contact/contactModel"], function (ListView, Contact) {

	var bindings = [{
		element: '.swipeout',
		event: 'deleted',
		handler: itemDeleted
	}];

	function init() {
		var contacts = loadContacts();
		ListView.render({ model: contacts, bindings: bindings });
		var element = document.getElementById("contacto");
		if(element !=null)
			element.innerHTML="";
	
		try 
		{
		
			var div = document.getElementById("googlemaps");
		var   map = plugin.google.maps.Map.getMap(div);
		map.one(plugin.google.maps.event.MAP_READY, function() {
		 // var position= JSON.parse(localStorage.getItem("mylocation"));
		  var GOOGLE = new plugin.google.maps.LatLng(21.0927126, -89.5540294);
		  map.setCameraZoom(14);
		  map.setCameraTarget(GOOGLE);
		  
		});
		}
		catch(ss)
		{
			alert(ss);
		}
	}

	function loadContacts() {
		var f7Base = localStorage.getItem("f7Base");
		var contacts = f7Base ? JSON.parse(f7Base) : tempInitializeStorage();
		return contacts;
	}

	function tempInitializeStorage() {
		var contacts = [
			new Contact({id: "1", firstName: "Alex", lastName: "Black", phone: "+380501234567" }),
			new Contact({id: "2", firstName: "Kate", lastName: "White", phone: "+380507654321" })
		];
		localStorage.setItem("f7Base", JSON.stringify(contacts));
		return JSON.parse(localStorage.getItem("f7Base"));
	}

	function itemDeleted(e) {
		var id = e.srcElement.id;
		var contacts = JSON.parse(localStorage.getItem("f7Base"));
		for (var i = 0; i < contacts.length; i++) {
			if (contacts[i].id === id) {
				contacts.splice(i, 1);
			}
		}
		localStorage.setItem("f7Base", JSON.stringify(contacts));
	}

	return {
		init: init
	};
});