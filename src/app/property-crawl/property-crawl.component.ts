import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { ToastrService } from 'ngx-toastr';
// import { Options, LabelType } from 'ng5-slider';
import { AppService } from 'src/app/app.service';



@Component({
  selector: 'app-property-crawl',
  templateUrl: './property-crawl.component.html',
  styleUrls: ['./property-crawl.component.scss']
})
export class PropertyCrawlComponent implements OnInit {
  @ViewChild('promap') private promap: ElementRef;

  _Observable: any;
  filters: {  latitude: number; longitude: number } = {
    latitude: 0, longitude: 0
  }

  checkIn: any;
  checkOut: any;

  spaces = [
    { label: "All place", value: '' },
    { label: "An entire place", value: 'entire' },
    { label: "A private room", value: 'private' },
    { label: "A shared room", value: 'shared' }
  ]

  center: any;

   // map start
   zoom = 10;
   markers: any = [];
   lat: number = 51.0447;
   lng: number = -114.0719;
   searchType: any = 'address';
   icon = {
     url: "assets/images/marker.png",
     scaledSize: {
       width: 45,
       height: 45,
     },
   };
 
   // map End
   allData: any = [];
   _host = environment.apiUrl;
   totalProperties: any = 0;
 
   user: any;
   loader: any;
   loaderData: any = [1, 2, 3, 4, 5]



   // search Form
  minDate: Date;

  data: any = [
    { label: 'Adults', quantity: 0, max_qty: 10 },
    { label: 'Children', quantity: 0, max_qty: 10 },
    { label: 'Infants', quantity: 0, max_qty: 10 },
    { label: 'Pets', quantity: 0, max_qty: 10 }
  ]
  // Search From end

  zoomLevel = [
    { zoom: 22, distance: 1128.497220 },
    { zoom: 21, distance: 1128.497220 },
    { zoom: 20, distance: 1128.497220 },
    { zoom: 19, distance: 2256.994440 },
    { zoom: 18, distance: 4513.988880 },
    { zoom: 17, distance: 9027.977761 },
    { zoom: 16, distance: 18055.955520 },
    { zoom: 15, distance: 36111.911040 },
    { zoom: 14, distance: 72223.822090 },
    { zoom: 13, distance: 144447.644200 },
    { zoom: 12, distance: 288895.288400 },
    { zoom: 11, distance: 577790.576700 },
    { zoom: 10, distance: 1155581.153000 },
    { zoom: 9, distance: 2311162.307000 },
    { zoom: 8, distance: 4622324.614000 },
    { zoom: 7, distance: 9244649.227000 },
    { zoom: 6, distance: 18489298.450000 },
    { zoom: 5, distance: 36978596.910000 },
    { zoom: 4, distance: 73957193.820000 },
    { zoom: 3, distance: 147914387.600000 },
    { zoom: 2, distance: 295828775.300000 },
    { zoom: 1, distance: 591657550.500000 },
    { zoom: 0, distance: 591657550.500000 },
  ]
  mapMove: any = false;
  isBig: any = false;
  dateArray: any = [];
  filtersModal: any;
  accessibility: any = [];
  checkedArray: any = [];
  transactionList: any = [];
  loginModal: boolean=false;
  constructor(private appService: AppService, @Inject(DOCUMENT) private document: Document,
  private _bs: BehaviorService, private route: ActivatedRoute,
  private router: Router,
  private toastr: ToastrService,
  private _activateRouter: ActivatedRoute) { 
    this.user = _bs.getLocalUser()
    const current = new Date();
    this.minDate = new Date(current.getFullYear(),
      current.getMonth(),
      current.getDate());
    const tommorow = new Date();
    tommorow.setDate(tommorow.getDate() + 1)


    this.route.queryParams.subscribe(params => {
      this.filters.latitude = Number(params['lat'] ? params['lat'] : '');
      this.filters.longitude = Number(params['lng'] ? params['lng'] : '');

    

    }); }

    close() {
      this.filtersModal = false
    }
  
    openModal() {
      this.checkedArray = []
      this.getAccesibility()
      this.filtersModal = true
    }
  
    acceessChange() {
      let checked: any = [];
  
      this.accessibility.map((item: any) => {
        item.acessibility.filter((itm: any) => {
          if (itm.isChecked) {
            checked.push(itm)
          }
        })
  
      })
  
  
    }
  
  
    moreSubmit() {
      this.close()
    }
  
    bigToggle() {
      this.mapMove = false;
      this.isBig = !this.isBig
    }
  
    getHeight() {
      this.promap.nativeElement.scrollHeight
      console.log("this.promap.nativeElement.scrollHeight", this.promap.nativeElement.scrollHeight)
      console.log("this.promap.nativeElement.scrollWidth", this.promap.nativeElement.scrollWidth)
    }
  
  
    getDays() {
      let value = 1
      // if (this.filters.checkIn) value = this._bs.getDays(this.filters.checkIn, this.filters.checkOut)
      return value;
    }
  
    getParam(p: any) {
      return this._activateRouter.snapshot.queryParamMap.get(p) || ''
    }
  
    ngOnInit(): void {
     
  
    }
  
  
    getPriceF() {
      this.search()
    }
  
  
    // Search Form
  
    updateCart(obj: any, key: any, child: any = '') {
  
      if (child) {
  
        if (key == 'up') {
          this.data[0]['child'][obj].quantity = this.data[0]['child'][obj].quantity + 1;
          // Max quantity
          if (this.data[0]['child'][obj].max_qty && (this.data[0]['child'][obj].quantity > parseInt(this.data[0]['child'][obj].max_qty))) {
            let qty = parseInt(this.data[0]['child'][obj].max_qty)
            this.data[0]['child'][obj].quantity--;
            return;
          }
  
        } else {
          this.data[0]['child'][obj].quantity--;
          if (this.data[0]['child'][obj].quantity < 0) {
            this.data[0]['child'][obj].quantity++;
            return;
          }
        }
      } else {
        if (key == 'up') {
          this.data[obj].quantity = this.data[obj].quantity + 1;
          // Max quantity
          if (this.data[obj].max_qty && (this.data[obj].quantity > parseInt(this.data[obj].max_qty))) {
            let qty = parseInt(this.data[obj].max_qty)
            this.data[obj].quantity--;
            return;
          }
  
        } else {
          this.data[obj].quantity--;
          if (this.data[obj].quantity < 0) {
            this.data[obj].quantity++;
            return;
          }
        }
      }
  
  
  
    }
  
    getIso(p: any) {
      // return this._bs.getIso(p)
    }
  
    search() {
      // this.mapMove = false;
  
      // if (this.checkIn) {
      //   this.filters.checkOut = this._bs.dateToString(this.checkOut)
      //   this.filters.checkIn = this._bs.dateToString(this.checkIn)
      //   // this.dateArray = this._bs.getDateStringArray(this.checkIn, this.checkOut);
      // }
  
      // this.filters.adults = this.data[0].quantity;
      // this.filters.child = this.data[1].quantity;
      // this.filters.infant = this.data[2].quantity;
      // this.filters.pets = this.data[3].quantity;
  
      // this.filters.adults = this.filters.adults == 0 ? '' : this.filters.adults;
      // this.filters.child = this.filters.child == 0 ? '' : this.filters.child;
      // this.filters.infant = this.filters.infant == 0 ? '' : this.filters.infant;
      // this.filters.page = 1;
  
      // document.getElementById('searchForm')?.classList.add("d-none");
      // // let timeout=setTimeout(()=>{
      // //   this.router.navigate(['/search'], {queryParams: this.filters});
      // //     clearTimeout(timeout)
      // //   },300)
      // // this._bs.searchForm.next(this.filters);
      this.searchProperty();
    }
  
    guestTotal() {
      let total: Number = 0;
      this.data.map((item: any) => {
  
        if (item.label != 'Pets' && item.label != 'Infants') {
          total = total += item.quantity
        }
  
      })
      return Number(total);
    }
  
    handleAddressChange(address: any) {
      let lat = address.geometry.location.lat()
      let lng = address.geometry.location.lng()
  
      this.filters.latitude = lat;
      this.filters.longitude = lng;
  
      let aArray: any = address.address_components;
  
      const getCity = () => {
        let value = '';
        aArray.map((item: any) => {
          if (item.types[0] == "locality") {
            value = item.long_name
          }
        })
        return value;
      }
  
      const getCountry = () => {
        let value = '';
        aArray.map((item: any) => {
          if (item.types[0] == "country") {
            value = item.long_name
          }
        })
        return value;
      }
  
      const getState = () => {
        let value = '';
        aArray.map((item: any) => {
          if (item.types[0] == "administrative_area_level_1") {
            value = item.long_name
          }
        })
        return value;
      }
  
      const getLocality = () => {
        let value = '';
        aArray.map((item: any) => {
          if (item.types[0] == "locality") {
            value = item.long_name
          }
        })
        return value;
      }
  
     
    }
  
    searchLocation(): void {
      this.document.getElementById("locationDropdown")?.classList.toggle("show1");
      this.document.getElementById("locationSection")?.classList.toggle("section1-active");
    }
  
    // Search Form end
  
    proImg(img: any) {
      // return this._bs.proImg(img)
      return img
    }
  
  
    getPrice(allData: any) {
      let locale: any = []
      // if (this.filters.checkIn) {
      //   this.dateArray = this._bs.getDateStringArray(this.filters.checkIn, this.filters.checkOut);
      //   locale = this.dateArray.map((item: any) => {
      //     return new Date(item)
      //   })
      // }
      // return this.propertyService.getPrice(allData, locale)

      return 0
    }
  
    getPerPrice(allData: any) {
      let locale: any = []
      // if (this.filters.checkIn) {
      //   this.dateArray = this._bs.getDateStringArray(this.filters.checkIn, this.filters.checkOut);
      //   locale = this.dateArray.map((item: any) => {
      //     return new Date(item)
      //   })
      // }
  
      // return Math.round(this.propertyService.getPerPrice(allData, locale))
      return 0
    }
  
  
    getMonthPrice(allData: any) {
      let price = this.getPerPrice(allData)
      return Math.round(price * 30.6)
    }
  
  
    showPerPrice(allData: any) {
      let discount = 0
      let price = this.getPerPrice(allData)
      // if (this.getDays() >= 7) discount = price * this.weeklyDiscount(allData).weeklyDist / 100
      if (this.getDays() >= 7) discount = price * this.weeklyDiscount(allData) / 100
      return Math.round(price - discount)
    }
  
    showPerMonthPrice(allData: any) {
      let price = this.getPerPrice(allData)
      price = price * 30.6
      // let discount = this.monthlyDiscount(allData, price).value
      let discount = 0
      return Math.round(price - discount)
    }
  
  
  
  
    pageChange() {
      // this.filters.page = 1;
      window.scroll(0, 0);
      this.searchProperty();
    }
  
    haversine_distance(mk1: any, mk2: any) {
      var R = 3958.8; // Radius of the Earth in miles
      var rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
      var rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
      var difflat = rlat2 - rlat1; // Radian difference (latitudes)
      var difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)
  
      var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
      return d;
    }
  
    searchProperty(type: any = '') {
  
      this.allData = []
      this.markers = [];
      this.totalProperties = 0;
      
      let url = 'search/property';
  
      // if (type == 'map') {
      //   url = 'map/properties'
      // } else {
      //   this.lat = this.filters.lat
      //   this.lng = this.filters.lng
      //   if (this.filters.state == '') {
      //     if (this.filters.country == 'United States' || this.filters.country == 'Africa') {
      //       this.zoom = 4;
      //     } else if (this.filters.country == 'Canada') {
      //       this.zoom = 2.5;
      //     } else if (this.filters.country == 'South Africa') {
      //       this.zoom = 5;
      //     } else {
      //       this.zoom = 5;
      //     }
      //   } else if (this.filters.city == '') {
      //     this.zoom = 5;
      //   } else {
      //     this.zoom = 12;
      //   }
      //   this.filters.zoom = this.zoom;
      // }
  
      // this._bs.load(true)
      this.loader = true
      this._Observable = this.appService.getAll(url, this.filters).subscribe((res: any) => {
        if (res.success) {
  
          if (res.data?.length) {
            // this.allData = res.data
            this.allData = res.data.map((cat: any) => {
              return {
              address: cat.address,
              area: cat.area,
              building: cat.building.rooms,
              location: cat.location,
              summary: cat.summary,
              attomId:cat.identifier.attomId,
  
              };
            });
          }
          
  
          if (this.allData.length > 0) {
            if (type == 'map') {
  
            } else {
              this.lat = Number(this.filters.latitude ? this.filters.latitude : this.allData[0].lat)
              this.lng = Number(this.filters.longitude ? this.filters.longitude : this.allData[0].lng)
  
              this.mapMove = true;
            }
  
          } else {
            this.mapMove = true;
          }
  
          this.markers = [];
          console.log(this.allData,"this.allDatathis.allData");
          
          this.allData.map((item: any) => {
            this.markers.push(
              {
                id: item.id,
                lat: item.location.latitude,
                lng: item.location.longitude,
                hovered: "test",
                iconUrl: 'assets/img/whiteMarker.png',
                detail: item,
                price: item.price,
                draggable: false
              }
            )
          })
          console.log(this.markers,"this.markers");
          
  
  
          this.setMarkerId()
          this.totalProperties = res.total;
        }
  
        // this._bs.load(false)
        this.loader = false
  
      }, error => {
        this.loader = false
        // this._bs.load(false)
      });
  
  
      console.log("this.getDays()", this.getDays())
    }
  
  
    getAccesibility() {
      if (this.accessibility.length > 0) return
      this._bs.load(true)
      this.appService.getAll('accessibilties', {}).subscribe((res: any) => {
        if (res.success) {
          this.accessibility = res.data;
        }
  
        this._bs.load(false)
      })
    }
  
    viewPrice(price: any) {
      return String(price)
    }
  
    propertyHover(i: any) {
      this.setMarkerId()
      const div1: any = document.querySelector(`.activemapMarker`);
      if (div1) div1.className = '';
      let id = this.markers[i].id;
  
      const div: any = document.querySelector(`.agm-map-container-inner div#markerId${id}`);
      if (div) div.className = 'activemapMarker';
    }
  
    setMarkerId() {
      this.markers.map((item: any, i: any) => {
        let index = i + 2;
        let div: any = document.querySelector(`.agm-map-container-inner div[role=button]:nth-child(${index})`);
        if (div) div.id = 'markerId' + item.id;
      })
    }
    round(p: any) {
      return Math.round(p)
    }
    removeClass() {
      const div1: any = document.querySelector(`.activemapMarker`);
      if (div1) div1.className = '';
    }
  
    viewProperty(id: any) {
      if (this.user == null  ) {
        this.loginModal = true;
  
        throw 'User Not Logged In';
      }{
        this.router.navigate(['estate/budgeting',{id:id}]);
      }
   
      
    }
  
    viewPropertyDetails(id: any) {
      this._bs.transferAtomID1(id)
      this.router.navigate(['property-dash',{id:id}]);
         
       }
    mapReady(map: any) {
      map.addListener("dragend", () => {
      });
    }
  
    // zoomIn() {
    //   if (this.filters.zoom == 22) return
    //   this.zoom = this.filters.zoom + 1
    // }
  
    // zoomOut() {
    //   if (this.filters.zoom == 0) return
    //   this.zoom = this.filters.zoom - 1
    // }
  
    markerClicked(e: any) {
  
      this.mapMove = false;
    }
  
    centerChange(event: any) {
      this.filters.latitude = event.lat;
      this.filters.longitude = event.lng;
    }
  
    // changeZoom(event: any) {
    //   this.filters.zoom = event;
    // }
  
    mapIdle() {
      if (this.searchType != 'address' && this.mapMove) {
        this.searchProperty('map');
      }
    }
  
    petFee(allData: any) {
      // return this.propertyService.petFee(allData, this.filters.pets)
      return 0
    }
  
    guestFee(allData: any) {
      // return this.propertyService.guestFee(allData, this.guestTotal(), this.getDays())
      return 0
    }
  
  
    boundschanged: any = false
    boundsChange(event: any) {
      var lat0 = event.getNorthEast().lat();
      var lng0 = event.getNorthEast().lng();
      // var lat1 = event.getSouthWest().lat();
      // var lng1 = event.getSouthWest().lng();
  
      let mk1 = { lat: lat0, lng: lng0 }
      let mk2 = { lat: this.filters.latitude, lng: this.filters.longitude }
      this.haversine_distance(mk1, mk2)
      var kilometers = this.haversine_distance(mk1, mk2) * 1.6;
  
      kilometers = kilometers * 70 / 100;
      // this.filters.distance = kilometers;
  
      if (!this.boundschanged) {
        this.searchProperty();
      }
  
      this.boundschanged = true
    }
  
  
    cleaningFee(allData: any) {
      // return this.propertyService.cleaningFee(allData, this.getDays())
      return 0
    }
  
    getPrice1(allData: any) {
      let value = this.getPrice(allData)
      value = value + this.cleaningFee(allData) + this.petFee(allData);
      return value
    }
  
  
   
  
    
  
    weeklyDiscount(adata: any) {
      let allData = {
        price: adata?.price,
        custom_setting: adata?.custom_setting,
        weekly_discount: adata?.weekly_discount,
      }
      // return this.propertyService.weeklyDiscount(allData, this.checkIn, this.getPrice(allData), this.getDays(), this.checkOut)
      return 0
    }
  
  
    monthlyDiscount(adata: any, price = 0) {
      let days = this.getDays()
      if (this.getDays() >= 28) {
        days = 30.6
      }
  
      let allData = {
        price: adata?.price,
        custom_setting: adata?.custom_setting,
        monthly_discount: adata?.monthly_discount,
      }
      // return this.propertyService.monthlyDiscount(allData, this.checkIn, price ? price : this.getPrice(allData), days, this.checkOut)
      return 0
    }
  

}
