({
    // =========================================
    // LOAD TREE
    // Entry : Id userId
    // Set : 
    // - USER currentUser 	: USER record of id :userId
    // - USER[] listManagers 	: Management chain above :userId
    // - USER[] listReports 	: All reports of :userId
    // - USER nextSibling		: Next Sibling of :userId (in alpahbetical order)
    // - USER prevSibling		: Previous Sibling of :userId (in alpahbetical order)
    // - USER[] circleReports	: 10 first reports
    // ==================================================
    loadTree : function(component, userId) {
        var loadHierarchy = component.get("c.getHierarchy");
        if (userId) loadHierarchy.setParams({ userid : userId });
        component.set("v.displayLoader",true); 
        loadHierarchy.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log(response.getReturnValue());
                component.set("v.currentUser", response.getReturnValue().selectedUser);
                component.set("v.listManagers", response.getReturnValue().listManagers);
                component.set("v.listReports", response.getReturnValue().listReports); 
                component.set("v.nextSibling", response.getReturnValue().nextSibling); 
                component.set("v.prevSibling", response.getReturnValue().prevSibling); 
                // Circle Reports
                var reports=response.getReturnValue().listReports;
                var listReports=[];
                var circleReports=[];
                if (reports.length>0)
                for (var i=0;i<10&i<reports.length;i++) { // Ellipse 150w, 120h
                    listReports.push({});
                    listReports[i].user=reports[i];
                   // listReports[i].left=-160*Math.cos(i*(Math.PI)/(10-1)); 
                  //  listReports[i].top=120*Math.sin(i*(Math.PI) /(10-1));
                   // listReports[i].left=1-(); //120-120*Math.cos(i*(Math.PI)/(reports.length-1)); 
                    listReports[i].top=10*reports.length*Math.sin(((i/(reports.length-1))*(Math.PI)));
                    circleReports.push(listReports[i]);
                }
                
                component.set("v.circleReports", circleReports); 
                console.log(circleReports);
                // Collapse flat list, hide loader and search areas
                component.set("v.flat",false);
                component.set("v.displayLoader",false);
                component.set("v.search",false);
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(loadHierarchy);
    },
    // ========================================================================
    // USER SEARCH
    // Entry : String inSearchStr 
    // Set : 
    // - USER[] searchResults	: List of matching records (SOSL Query)
    // ========================================================================
    userSearch : function(component, inSearchStr) {
        var usrSearch = component.get("c.getUserSearch");
        console.log('User Search Search String: ' + inSearchStr);
        component.set("v.displayLoader",true);
        if (inSearchStr != '') {          
            usrSearch.setParams({inSearchStr: inSearchStr});
            usrSearch.setCallback(this, function(response){
                component.set("v.displayLoader",false);
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.set("v.searchResults", response.getReturnValue());
                } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
            });
            $A.enqueueAction(usrSearch);
        } 
    }
})