import { Size } from './../../../../node_modules/ol/size.d';
import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style, Circle as CircleStyle, Fill, Stroke, Text } from 'ol/style';
import { XYZ } from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import { defaults as defaultControls, Zoom } from 'ol/control';

@Component({
  selector: 'app-ol-map',
  standalone: true,
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.css']
})
export class OlMapComponent implements AfterViewInit {

  private map!: Map;
  private isBrowser: boolean;

  bookings = [
    { lat: 40.7128, lng: -74.0060, name: 'Ahmed', img: 'https://picsum.photos/seed/newyork/200' },
    { lat: 51.5074, lng: -0.1278, name: 'Ali', img: 'https://picsum.photos/seed/london/200' },
    { lat: 48.8566, lng: 2.3522, name: 'Moh', img: 'https://picsum.photos/seed/paris/200' },
    { lat: 34.0522, lng: -118.2437, name: 'salah', img: 'https://picsum.photos/seed/losangeles/200' },
    { lat: 25.276987, lng: 55.296249, name: 'moh', img: 'https://picsum.photos/seed/dubai/200' },
    { lat: 30.0444, lng: 31.2357, name: 'ragab', img: 'https://picsum.photos/seed/cairo/200' },
  ];



  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.initMap();
      this.showZoomLevel();
      this.setupTooltip();
    }
  }

  private initMap(): void {
    // Layer: OpenStreetMap


      // Layer: OpenStreetMap
      const osmLayer = new TileLayer({
        source: new OSM({
          maxZoom:20,
        })
      });

    // Layer: markers
    const features = this.bookings.map(b => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([b.lng, b.lat])),
        data: b
      });
      this.makeCircularImage(b.img, 64).then(circularImg => {
        feature.setStyle(new Style({
          image: new Icon({
            src: circularImg,   // صورة مقصوصة دايرة
            anchor: [0.5, 0.5],
            scale: 0.5
          })
        }));
      });

      return feature;
    });

    const vectorLayer = new VectorLayer({
      source: new VectorSource({ features })
    });

    // إنشاء الخريطة
    this.map = new Map({
      target: 'ol-map',
      layers: [osmLayer, vectorLayer],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 0
      }),
      controls: defaultControls({
        zoom: true,
        attribution: false,
        rotate: false
      })
    });
  }
  private showZoomLevel() {
    const zoomEl = document.querySelector('.ol-zoom') as HTMLElement;
    let spn =document.createElement('span')
    spn.innerText = '12%';
    zoomEl.appendChild(spn)
    


    const view = this.map.getView();
    const maxZoom = 20; // أقصى zoom تعرفه أو محدد
    view.on('change:resolution', () => {
      const zoom = view.getZoom()!;
      const percent = (zoom / maxZoom) * 100;
      if (zoomEl) {
        spn.innerText = `${percent.toFixed(0)}%`;
      }
    });
  }
  makeCircularImage(src: string, size: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous'; // مهم لو الصورة جاية من URL خارجي
      img.src = src;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d')!;

        // قص الدائرة
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        // رسم الصورة جوا الدايرة
        ctx.drawImage(img, 0, 0, size, size);

        resolve(canvas.toDataURL()); // ترجّع Base64 image
      };

      img.onerror = reject;
    });
  }

  private setupTooltip(): void {
    const popup = document.getElementById('popup')!;

    this.map.on('pointermove', evt => {
      // console.log("here")
      const feature = this.map.forEachFeatureAtPixel(evt.pixel, f => f);
      console.log(feature)
      if (feature && feature.get('data')) {
        console.log("here2")
        const data = feature.get('data');
        popup.innerHTML = `
          <strong>${data.name}</strong><br>
          Lat: ${data.lat}<br>
          Lng: ${data.lng}
        `;
        popup.style.display = 'block';
        popup.style.left = evt.pixel[0] + 50 + 'px';
        popup.style.top = evt.pixel[1] + 50 + 'px';
      } else {
        popup.style.display = 'none';
      }
    });
  }
}
