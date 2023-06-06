import { Segment } from './segment.model';

export class Trip {
  public tripId: number;
  public tripName: string;
  public imoNumber: number;
  public portFrom: string;
  public portTo: string;
  public segments: Segment[];

  constructor(
    tripId: number,
    tripName: string,
    imoNumber: number,
    portFrom: string,
    portTo: string,
    segments: Segment[]
  ) {
    this.tripId = tripId;
    this.tripName = tripName;
    this.imoNumber = imoNumber;
    this.portFrom = portFrom;
    this.portTo = portTo;
    this.segments = segments;
  }
}
