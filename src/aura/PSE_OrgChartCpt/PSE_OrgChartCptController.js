({
    doInit : function(component, event, helper) {
        helper.loadTree(component,null);
    },
    toggleFlatList : function(component, event, helper) {
       // console.log('Toggle Flat List');
        component.set("v.flat",!component.get("v.flat"));
        component.set("v.search",false); // Hide Search area
    },
    toggleSearch : function(component, event, helper) {
       // console.log('Toggle Search');
        component.set("v.search",!component.get("v.search"));
    },
    selectNode : function(component, event, helper) {
        var nodeId=event.target.getAttribute("data-id");
       // console.log('select Node '+nodeId);
        helper.loadTree(component,nodeId);
    },
    prevSibling : function(component, event, helper) {
        var nodeId=component.get("v.prevSibling").Id;
        helper.loadTree(component,nodeId);
    }, 
    nextSibling : function(component, event, helper) {
        var nodeId=component.get("v.nextSibling").Id;
        helper.loadTree(component,nodeId);
    }, 
    doSearch : function(component, event, helper) {
        var SearchInput = component.find("txtSearch"); 
        var strSearchText = SearchInput.get("v.value");
        helper.userSearch(component, strSearchText + '*');
    },
	navigateToSelectedUser : function(component, event, helper) {
        var sObjId = component.get("v.currentUser.Id");          
        var navToSObjEvt = $A.get("e.force:navigateToSObject");
        navToSObjEvt.setParams({
            recordId: sObjId,
            slideDevName: "detail"
        }); 
        navToSObjEvt.fire(); 
    }

})