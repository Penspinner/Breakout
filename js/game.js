var Game = function() 
{
    this.trollVelocity = 300;
}

Game.prototype = 
{
    preload: function()
    {
        this.load.image('paddle', 'images/troll.png');
        this.load.image('brick', 'images/troll.png');
        this.load.image('troll', 'images/troll.png');
    },
    
    create: function()
    {
//        this.stage.backgroundColor = '#3598db';
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.world.enableBody = true;
        this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
        
        this.left = this.input.keyboard.addKey(Phaser.KeyCode.LEFT);
        this.right = this.input.keyboard.addKey(Phaser.KeyCode.RIGHT);
        
        this.paddle = this.add.sprite(this.world.centerX, 400, 'paddle');
        this.paddle.body.immovable = true;
        this.paddle.scale.setTo(0.3, 0.1);
        
        this.bricks = this.add.group();
        for (var i = 0; i < 5; i++) 
        {
            for (var j = 0; j < 5; j++) 
            {
                var brick = this.add.sprite(55 + i * 60, 55 + j * 35, 'brick');
                brick.body.immovable = true;
                brick.scale.setTo(0.2, 0.2);
                this.bricks.add(brick);
            }
        }
        
        this.troll = this.add.sprite(200, 300, 'troll');
        this.troll.body.velocity.x = 200;
        this.troll.body.velocity.y = 200;
        this.troll.body.bounce.setTo(1);
        this.troll.body.collideWorldBounds = true;
        this.troll.scale.setTo(0.15, 0.15);
        
        this.screenText = this.add.text(this.world.centerX - 100, this.world.centerY + 150);
    },
    
    update: function()
    {
        if (this.left.isDown)
        {
            this.paddle.body.velocity.x = -this.trollVelocity;
        } else if (this.right.isDown)
        {
            this.paddle.body.velocity.x = this.trollVelocity;
        } else
        {
            this.paddle.body.velocity.x = 0;
        }
        
        this.physics.arcade.collide(this.paddle, this.troll);
        this.physics.arcade.collide(this.troll, this.bricks, this.hit, null, this);
        
        if (this.troll.y > this.paddle.y)
            this.state.start('Game');
        
        
    },
    
    hit: function(ball, brick)
    {
        brick.kill();
    },
    
    render: function()
    {
        var text = 'Time elapsed: ' + this.time.now / 1000;
        var style = {};
        this.screenText.text = text;
    }
}
