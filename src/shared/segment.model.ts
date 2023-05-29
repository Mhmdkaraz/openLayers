import { Position } from './position.modal';

export class Segment {
  public positions: Position[];

  constructor(positions: Position[]) {
    this.positions = positions;
  }
}
