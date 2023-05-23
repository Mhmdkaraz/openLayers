export class Vessel {
  public imoNumber: number;
  public vesselName: string;
  public country: string;
  public latitude: number;
  public longitude: number;
  public speed: number;
  public timeOfPosition: string;

  constructor(
    imoNumber: number,
    vesselName: string,
    country: string,
    latitude: number,
    longitude: number,
    speed: number,
    timeOfPosition: string
  ) {
    this.imoNumber = imoNumber;
    this.vesselName = vesselName;
    this.country = country;
    this.latitude = latitude;
    this.longitude = longitude;
    this.speed = speed;
    this.timeOfPosition = timeOfPosition;
  }
}
