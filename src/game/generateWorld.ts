import Phaser from "phaser";

export const generateWorld = (): Phaser.Game => {
  let controls: Phaser.Cameras.Controls.SmoothedKeyControl;

  const game = new Phaser.Game({
    type: Phaser.WEBGL,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "#2d2d2d",
    parent: "phaser-example",
    pixelArt: true,
    scene: {
      active: true,
      preload() {
        this.load.image("tiles", "assets/static.png");
        this.load.tilemapTiledJSON("map", "maps/1.json");
      },
      create() {
        const map = this.make.tilemap({
          key: "map",
        });

        const tileset1 = map.addTilesetImage("static", "tiles");

        map.createLayer("Tile Layer 1", [tileset1]);

        const cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setZoom(1);

        const controlConfig = {
          camera: this.cameras.main,
          left: cursors.left,
          right: cursors.right,
          up: cursors.up,
          down: cursors.down,
          acceleration: 0.04,
          drag: 0.0005,
          maxSpeed: 0.7,
        };

        controls = new Phaser.Cameras.Controls.SmoothedKeyControl(
          controlConfig
        );
      },
      update(_time, delta) {
        controls.update(delta);
      },
    },
  });

  return game;
};
