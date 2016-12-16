({
    
    rerender : function(cmp, helper){
        console.log('Rerender');
        this.superRerender();
        var objDiv = document.getElementById("scrolling-top");
        if (objDiv){
    	    objDiv.scrollTop = objDiv.scrollHeight;
	        console.log(objDiv.scrollHeight);
        }
    }
    
})