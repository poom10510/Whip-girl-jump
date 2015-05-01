var Wall = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/Wall.png' );
    }
});