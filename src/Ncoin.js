var Ncoin = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/Normal_coin.png' );
    },
    
    randomPosition: function() {
        // --- your task is to write this method
        this.setPosition( new cc.Point( 50+Math.random() * (screenWidth-100),50+Math.random() * (screenHeight-100) ) );
    },
    closeTo: function( obj ) {
	     var myPos = this.getPosition();
	     var oPos = obj.getPosition();
         return ( ( Math.abs( myPos.x - oPos.x ) <= 40 ) &&( Math.abs( myPos.y - oPos.y ) <= 50 ) );
    }
});