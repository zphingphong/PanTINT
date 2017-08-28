import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.less']
})
export class TileComponent implements OnInit {

  static readonly TILE_WIDTH: number = 300;
  @Input()
  data: any;
  public author: any;

  constructor() { }

  ngOnInit() {
    this.author = JSON.parse(this.data.author);
  }

}
