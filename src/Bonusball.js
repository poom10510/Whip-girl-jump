var Bonusball = Xbomb.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/Bonusball.png' );
    },
    ItemAtt: function(obj){   
        var pos = obj.getPosition();
        obj.flow=25;
        obj.setPosition( new cc.Point( pos.x, pos.y+50 ) );
          
    },
});