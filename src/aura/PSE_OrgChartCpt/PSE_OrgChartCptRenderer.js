({
    rerender : function(component){
        this.superRerender();
        /// scroll to bottom of manager list
        window.setTimeout(
            $A.getCallback(function() {
                var mgrsectionelt=component.find('mgrSection').getElement();
                if (mgrsectionelt){
                    mgrsectionelt.lastChild.scrollIntoView(false);
                }
            }), 500
        );
    }
})