import { HostListener, OnInit, Component } from '@angular/core';
import { TintService } from './services/tint.service';
import { TileComponent } from './tile/tile.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  public numTilesPerRow: number = 0;
  private tilePadding: number;
  public tints: any[];
  public formattedTiles: any[];

  constructor(private tintService: TintService){
    this.tilePadding = TileComponent.TILE_WIDTH/4;
    this.numTilesPerRow = Math.floor(window.screen.width / (TileComponent.TILE_WIDTH + (this.tilePadding)));
    this.formattedTiles = new Array();
  }

  ngOnInit() {
    this.loadTiles();
  }

  private loadTiles() {
    this.tintService.retrieveFirst().subscribe(
      data => {
        this.tints = data;
        this.fillTiles();
      }, //Bind to view
      err => {
        // Log errors if any
        console.log(err);
      });
  }

  private fillTiles() {
    while(this.tints.length) {
      this.formattedTiles.push(this.tints.splice(0, this.numTilesPerRow));
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.numTilesPerRow = Math.floor(event.target.innerWidth / (TileComponent.TILE_WIDTH + (this.tilePadding)));
    this.formattedTiles = new Array(); // Reset tile. This is not designed to be responsive. You can show it on multiple screen size, but it won't totally react to window resizing.
    this.loadTiles();
  }

  loadMoreTiles () {
    var retrieveMoreReturn = this.tintService.retrieveMore();
    if(retrieveMoreReturn) {
      retrieveMoreReturn.subscribe(
        data => {
          this.tints = data;

          // Figure out the left over space on the last row and fill it first before starting a new row
          let lastTileLength = this.formattedTiles[this.formattedTiles.length - 1].length;
          if (lastTileLength < this.numTilesPerRow) {
            let numLeftOver = this.numTilesPerRow - lastTileLength;
            let pullOverTints = this.tints.splice(0, numLeftOver);
            for (let i = 0; i < numLeftOver; i++) {
              this.formattedTiles[this.formattedTiles.length - 1].push(pullOverTints[i]);
            }
          }

          // Continue with the rest of the new loaded tiles on the next row
          this.fillTiles();
        }, //Bind to view
        err => {
          // Log errors if any
          console.log(err);
        });
    }
  }
}
