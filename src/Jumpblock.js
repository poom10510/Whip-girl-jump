var Jumpblock = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/jumpblock.png' );
    },
    
    randomPosition: function() {
        // --- your task is to write this method
        this.setPosition( new cc.Point( Math.random() * screenWidth,Math.random() * screenHeight ) );
    },
    closeTo: function( obj ) {
	var myPos = this.getPosition();
	var oPos = obj.getPosition();
  	return ( ( Math.abs( myPos.x - oPos.x ) <= 16 ) &&
		 ( Math.abs( myPos.y - oPos.y ) <= 16 ) );
    }
});