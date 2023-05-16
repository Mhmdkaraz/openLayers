export class Vessel {
  public name: string;
  public imoNumber: number;
  public portFrom: string;
  public portTo: string;
  public type: string;
  public arrivalDate: string;
  public speed: number;

  constructor(
    name: string,
    imoNumber: number,
    portFrom: string,
    portTo: string,
    type: string,
    arrivalDate: string,
    speed: number
  ) {
    this.name = name;
    this.imoNumber = imoNumber;
    this.portFrom = portFrom;
    this.portTo = portTo;
    this.type = type;
    this.arrivalDate = arrivalDate;
    this.speed = speed;
  }
}
