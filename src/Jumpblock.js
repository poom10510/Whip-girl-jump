var Jumpblock = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/jumpblock.png' );
    },
    
    randomPosition: function() {
        // --- your task is to write this method
        this.setPosition( new cc.Point( Math.random() * screenWidth,Math.random() * screenHeight-50 ) );
    },
    closeTo: function( obj ) {
	     var myPos = this.getPosition();
	     var oPos = obj.getPosition();
         return ( ( Math.abs( myPos.x - oPos.x ) <= 16 ) &&( Math.abs( myPos.y - oPos.y ) <= 90 ) );
    },
    onTop: function( rect ) {
        /*var brect = this.getBoundingBoxToWorld();
        var bminx = cc.rectGetMinX( brect );
        var bmaxx = cc.rectGetMaxX( brect );
        var minx = cc.rectGetMinX( rect );
        var maxx = cc.rectGetMaxX( rect );
        return ( minx <= bmaxx ) && ( bminx <= maxx );*/
       // this.getPosition
    }
});