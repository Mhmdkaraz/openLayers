import PointerInteraction from 'ol/interaction/Pointer';
import { Coordinate } from 'ol/coordinate';
import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import Map from 'ol/Map';

class Drag extends PointerInteraction {
  private coordinate_: Coordinate | null;
  private cursor_: string | undefined;
  private feature_: any | null;
  private previousCursor_: string | undefined;

  constructor() {
    super({});

    this.coordinate_ = null;
    this.cursor_ = 'pointer';
    this.feature_ = null;
    this.previousCursor_ = undefined;
  }

  handleDownEvent(evt: MapBrowserEvent<UIEvent>): boolean {
    const map = evt.map;
    const feature = map.forEachFeatureAtPixel(evt.pixel, (feature) => {
     console.log(feature) 
     return feature;
    });

    if (feature) {
      this.coordinate_ = evt.coordinate;
      console.log('Handle Down', this.coordinate_);
      this.feature_ = feature;
    }

    return !!feature;
  }

  handleDragEvent(evt: MapBrowserEvent<UIEvent>): void {
    const deltaX = evt.coordinate[0] - (this.coordinate_ as Coordinate)[0];
    const deltaY = evt.coordinate[1] - (this.coordinate_ as Coordinate)[1];

    const geometry = (this.feature_ as Feature<Geometry>).getGeometry();
    geometry.translate(deltaX, deltaY);

    (this.coordinate_ as Coordinate)[0] = evt.coordinate[0];
    (this.coordinate_ as Coordinate)[1] = evt.coordinate[1];
    console.log('Handle Drag', this.coordinate_);
  }

  handleMoveEvent(evt: MapBrowserEvent<UIEvent>): void {
    if (this.cursor_) {
      const map = evt.map;
      const feature = map.forEachFeatureAtPixel(evt.pixel, (feature) => {
        return feature;
      });
      const element = evt.map.getTargetElement();
      if (feature) {
        if (element.style.cursor !== this.cursor_) {
          this.previousCursor_ = element.style.cursor;
          element.style.cursor = this.cursor_;
        }
      } else if (this.previousCursor_ !== undefined) {
        element.style.cursor = this.previousCursor_;
        this.previousCursor_ = undefined;
      }
    }
  }

  handleUpEvent(evt: MapBrowserEvent<UIEvent>): boolean {
    console.log(evt.coordinate);
    this.coordinate_ = null;
    this.feature_ = null;
    return false;
  }
}

export default Drag;
