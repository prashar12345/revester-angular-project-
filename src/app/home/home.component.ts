import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppService } from '../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AppStateService } from '../shared/app-state.service';
import { BehaviorService } from '../shared/behavior.service';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { Options as data } from 'ngx-google-places-autocomplete/objects/options/options';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  search_Data: any;
  public searchForm: FormGroup;
  public propertCrawlFrom: FormGroup;
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  submitted: boolean = false;
  allPlanState: any;
  city:any
  budgetmodel: any = false
  budget: any
  postal_code: any;
  options: Options = new Options({
    types: ['address'],
    componentRestrictions: { country: 'US' }
  });
  options1: data = new data({
    types: ['(cities)'],
    componentRestrictions: { country: 'US' }
  });
  loginModal: boolean = false;
  card_added: boolean = false;
  card_addeds: boolean = false;
  user: any
  filters:any = {
    page: 1, pageSize: 20, lat: 0, lng: 0,
    mapMove:false
  }
  user_SubscriptionPlan: any;
  constructor(

    private router: Router,
    private route: ActivatedRoute,
    private _bs: BehaviorService,
    private appService: AppService,
    private formBuilder: FormBuilder,
    public appStateSvc: AppStateService) {
    this.user = _bs.getLocalUser()
    console.log(this.user)
    this.searchFormFree();
    this.propertCrawl();
  }
  searchFormFree() {
    this.searchForm = this.formBuilder.group({
      address: ['']
    });
  }
  propertCrawl() {
    this.propertCrawlFrom = this.formBuilder.group({
      paidSearch: ['']
    });
  }
  get f() { return this.searchForm.controls; }
  get ff() { return this.propertCrawlFrom.controls; }

  ngOnInit(): void {
    // this.getData()
    // this.getAllPlanState();
    this.appService.currentsearchData.subscribe(searchData => this.search_Data = searchData)
    this.user_SubscriptionPlan = this.appService.user_SubscriptionPlan();
    // console.log(this.user_SubscriptionPlan);

    // this.get_user_id();
  }

  onSubmit() {
    this.searchForm.value.address = this.postal_code;
    this.submitted = true;
    // console.log(this.searchForm.value);
    if (this.searchForm.value.address !== undefined) {
      // this.appService.changeSearchData(this.searchForm.value);
      const state = this.appStateSvc.stateData;
      state.postalCode = this.searchForm.value.address;
      state.freeSearch = true;
      this.appStateSvc.stateData = state;
      this.appStateSvc.freeSearch();
      console.log('Home component', this.appStateSvc.stateData);

      this.router.navigate(['/property-dash']);
    }
  }
  public handleAddressChange(address: any, searchType: string) {
    console.log("address", address);
    let lat = address.geometry.location.lat()
    let lng = address.geometry.location.lng()
    this.filters.lat = lat;
    this.filters.lng = lng;

    let aArray: any = address.address_components;

    const getAddress = (i: any) => {
      return aArray[aArray.length - i].long_name
    }
    for (var i = 0; i < address.address_components.length; i++) {
      for (var j = 0; j < address.address_components[i].types.length; j++) {
        if (address.address_components[i].types[j] == "postal_code") {
          this.postal_code = address.address_components[i].long_name;
        }
      }
    }
    console.log("postal_code", this.postal_code);
    if (searchType == "free") {
      this.searchForm.patchValue({ lat, long: lng, address: address.formatted_address, country: getAddress(1), state: getAddress(2), city: getAddress(3) })
      console.log("this.searchForm", this.searchForm.value)
    } else {
      this.propertCrawlFrom.patchValue({ lat, long: lng, address: address.formatted_address, country: getAddress(1), state: getAddress(2), city: getAddress(3) })
      console.log("this.propertCrawlFrom", this.propertCrawlFrom.value)
    }
  }
  // getData(){
  //   this._bs.load(true)
  //   this.appService.getAll('user',{id:this.user?.this.user?id:''}).subscribe(res=>{
  //     if(res.success){
  //       this.budget=res.data
  //     }
  //     console.log(this.budget,"dfdsfsdfsdfdsfdsfsdfsd");
  //     this._bs.load(false)
  //   })
  // }
  getAllPlanState() {
    // this.spinner.show();
    this.appService.getAllPlanState('property/state').subscribe((res: any) => {
      if (res.success) {
        this.allPlanState = res.data.item
      }
      console.log(this.allPlanState);
    });

  }
  view_property(name?: any) {
    if (this.appStateSvc.stateData.user == null) {
      this.loginModal = true;

      throw 'User Not Logged In'

    }
    else {
      this.card_added = true;
    }
    if (this.user.subscriptionPlan) {

      this.router.navigate(['/']);


    }



    // }


  }
  view_propertys() {
    if (this.appStateSvc.stateData.user == null) {
      this.loginModal = true;

      throw 'User Not Logged In';
    }
  
    if (this.user.subscriptionPlan) {

      this.viewModal = true


    }
    else {
      this.card_added = true;
    }

  }


  view_propertie(name?: any) {
    if (name === 'Budget') {
      this.router.navigate(['/estate/budgeting']);
    }
    else {
      this.router.navigate(['/estate/budgeting']);
    }

  }
  SearchProperty(){
    console.log(this.searchForm.value.address);
    this.filters.address=this.searchForm.value.address
  
      this.router.navigate(['/property-crawl'], {queryParams: this.filters});
   

  }

  view_blogs() {
    if (this.appStateSvc.stateData.subcriptionStatus) {
      // console.log('if');

      this.router.navigate(['/blogs']);
    } else {
      // console.log('else');
      this.card_addeds = true;

    }

  }
  explore_properties() {
    if (this.appStateSvc.stateData.subcriptionStatus) {
      // console.log('if');

      this.router.navigate(['/blogs']);

    } else {
      // console.log('else');
      this.card_added = true;

    }
  }
  pay_subscription() {


    this.router.navigate(['/estate/budgeting']);


  }
  view_properties() {
    this.router.navigate(['/estate/budgeting']);
  }
  view_blogsimage() {
    if (this.appStateSvc.stateData.subcriptionStatus) {
      // console.log('if');

      this.router.navigate(['/blogs']);
    } else {
      // console.log('else');
      this.card_addeds = true;

    }
  }

  title = 'ngSlick';


  slides = [342, 453, 846, 855, 234];

  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 3,
    "dots": true,
    "infinite": false,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }]
  };

  addSlide() {
    this.slides.push(488)
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }





  viewModal: Boolean = false;
  openviewModal() {
    this.viewModal = true
  }



  // roiModal: Boolean = false;
  // openRoiModal() {
  //   this.roiModal = true
  // }

  // marketModal: Boolean = false;
  // opeMarketModal() {
  //   this.marketModal = true
  // }



}
