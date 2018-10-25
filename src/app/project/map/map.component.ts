import { Component} from '@angular/core';
import { MouseEvent } from '@agm/core';import { ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from '@types/googlemaps';
import { MapsAPILoader } from '@agm/core';
import { Http } from '@angular/http';
import {Location} from '@angular/common';
import { AntennasService } from '../../antennas.service';
import { Router } from '@angular/router';
import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-map',
  styles: [`
  agm-map {
    height: 300px;
  }
`],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit{
  @Input()
  map;
  @Output()
  hide:EventEmitter<any>=new EventEmitter()
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
 public loading:boolean=false;
  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private http: Http,
    private _location: Location,
    private antennasService: AntennasService,
  private router: Router
  ) {
    // window.document.title='<img src="antenna.png"/>'
  }

  ngOnInit() {
    this.latitude = 32.109333;
    this.longitude= 34.855499;
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();
  this.antennasService.showsSpinner();
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
       this.antennasService.hideSpinner()
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"],
        componentRestrictions: {country: 'IL'}
           });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
       let x= place.geometry.viewport.toJSON()["north"];
        let y= place.geometry.viewport.toJSON()["west"];

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat( );
          this.longitude = place.geometry.location.lng() ;
          this.zoom = 16;

          this.loading=true
          this.antennasService.getDictCompany(place.formatted_address, x, y).add(res=> {
            // setTimeout(() => {
              this.loading=false;
              this.map=false;
              // this.hide.emit()
              this.router.navigate(['/Home/Address'])
            // }, 1000);
          });
          
        });
      });
    });
  }
 
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}
