//ResourceLoader

var rm = (function(){

    var resources;
    var resourcesLoaded;
    var song;
    var done;

    return{
	ResourceType:{
	    IMAGE:0,
            SOUND:1,
        },
	
	im: [],
        images: {},
        sounds: {},

        init: function(){
            resources = [];
            resourcesLoaded = 0;

        },

        addResource: function(name, filePath, fileType, resourceType, filter){
            var res = {
                name: name,
		filePath: filePath,
                fileTtype: fileType,
		resourceType: resourceType,
                filter: filter
            }
            resources.push(res);
        },

        startPreloading: function(){
            for(var i = 0; i < resources.length; i++){
                switch(resources[i].resourceType){
		case rm.ResourceType.IMAGE:
                    (function () {
			var img = new Image();
			var filter = resources[i].filter;
                        img.src = resources[i].filePath;
                        img.addEventListener('load', function() {
                            if (filter) {
				img.src = filter(img);
				filter = undefined;
                                img.addEventListener('load', this);
                            }
                            else {
                                rm.onResourceLoaded();
                            }
                        }, false);
			rm.im[i] = img;
                        rm.images[resources[i].name] = img;
                    })();


                    break;

		case rm.ResourceType.SOUND:
                    var a = new Audio();
                    a.src = resources[i].filePath;
                    a.type = resources[i].fileType;

                    a.addEventListener('canplaythrough', function(){
                        a.removeEventListener('canplaythrough', arguments.callee, false);
                        rm.onResourceLoaded();
                    }, false);

                    rm.sounds[resources[i].name] = a;
                    break;
		}
	    }
        },

	onResourceLoaded: function(){
            resourcesLoaded++;
            if (rm.isLoadComplete() && done) {
                done();
            }
        },

        isLoadComplete: function(){
            return(resources.length === resourcesLoaded);
        }
    };
})();