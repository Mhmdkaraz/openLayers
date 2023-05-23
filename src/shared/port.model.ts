export class Port {
  public portCode: string;
  public portName: string;
  public city: string;
  public country: string;
  public latitude: number;
  public longitude: number;

  constructor(
    portCode: string,
    portName: string,
    city: string,
    country: string,
    latitude: number,
    longitude: number
  ) {
    this.portCode = portCode;
    this.portName = portName;
    this.city = city;
    this.country = country;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
