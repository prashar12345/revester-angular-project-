import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppStateService } from 'src/app/shared/app-state.service';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { SharedserviceService } from 'src/app/shared/sharedservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-listing',
  templateUrl: './blog-listing.component.html',
  styleUrls: ['./blog-listing.component.scss']
})
export class BlogListingComponent implements OnInit {
  private _subscriberData: any;
  actionType: any = "active";
  _baseUrl = environment.apiUrl;
  public faqData: Array<any> = [];
  public response: any;
  public response2: any;
  totalItems: number | undefined;
  rows = [];
  columns = [];
  lodingcard = [1, 2, 3, 4, 5, 6];
  page = 1;
  chosenMod: any = "";
  isDeleted = false;
  search_value: any = "";
  filters: { page: number; count: number; search: string; isDeleted: boolean; category: string; } =
    { page: 1, count: 20, search: "", isDeleted: false, category: "" };
  AppService: any;
  loader: boolean = false;
  public catData: Array<any> = [];
  constructor(
    private formBuilder: FormBuilder,
    private sharedserviceService: SharedserviceService,
    private modalService: NgbModal,
    private router: Router,
    private _bs: BehaviorService,
    private _activateRouter: ActivatedRoute,
    public appStateSvc: AppStateService
  ) { }

  ngOnInit(): void {
    this.getCategory();
    if (this._activateRouter.snapshot.params["page"]) {
      this.filters.page = JSON.parse(
        this._activateRouter.snapshot.params["page"]
      );
      this.page = this.filters.page;
      console.log(
        this.filters.page,
        typeof this._activateRouter.snapshot.params["page"]
      );
      Object.assign(this.filters, { page: this.filters.page });
      this.getBlogs();
    } else {
      this.page = 1;
      this.getBlogs();
    }
  }
  categorysearch() {
    console.log(this.chosenMod);
    this.getBlogs();
  }
  search() {
    console.log(this.search_value);
    this.getBlogs();
  }

  getBlogs() {
    this.appStateSvc.stateData.loader = true
    this.filters.category = this.chosenMod
    this.filters.search = this.search_value
    this.sharedserviceService
      .getAllBlogs(this.filters)
      .subscribe((response: any) => {
        if (response.data.length == 0) {
          this.faqData = [];
          this.totalItems = response.total;
          console.log(this.totalItems)
        } else {
          this.totalItems = response.total;
          this.appStateSvc.stateData.loader = false
          console.log(this.totalItems)
          this.faqData = response.data.map((cat: any) => {
            return {
              id: cat._id,
              title: cat.title,
              description: cat.description.replace(/<\/?[^>]+(>|$)/g, ""),
              image: cat.image,
              status: cat.status,
              deletedBy: cat.deletedBy,
              createdAt: cat.createdAt,
              deletedAt: cat.deletedAt,
            };
          });
        }
        console.log(this.faqData, "this.faqData");
      });
  }
  view(ID: any, type: any) {
    console.log("ID", ID);
    this.sharedserviceService.actionType.next(type);
    let route = "blogdetail/" + ID;

    this.router.navigate([route]);
  }


  getCategory(type?: any) {
    this.sharedserviceService.actionType.next(type)
    this._subscriberData = this.sharedserviceService.getAllCategory(this.filters).subscribe((response) => {
      this.catData = [];
      this.totalItems = response.total;
      console.log(this.catData.length);

      this.totalItems = response.total
      if (response['data'].length == 0) {
        this.catData = [];
        this.totalItems = response.total;
      } else {
        this.totalItems = response.total
        this.catData = response['data'].map((cat: { _id: any; id: any; name: any; createdAt: any; status: any; deletedBy: any; deletedAt: any; }) => {

          return {
            id_new: cat.id,
            id: cat._id,
            catName: cat.name,
            date: cat.createdAt,
            status: cat.status,
            deletedBy: cat.deletedBy,
            deletedAt: cat.deletedAt
          }
        });
      }
    });

  }
  // category_search(){
  //   console.log(this.chosenMod);
  //   this.loader=true
  //   this.sharedserviceService
  //     .get_cate_blog(this.filters)
  //     .subscribe((response:any) => {
  //       if (response.data.length == 0) {
  //         this.faqData = [];
  //         this.totalItems = response.total;
  //       } else {
  //         this.totalItems = response.total;
  //         this.loader=false
  //         this.faqData = response.data.map((cat:any) => {
  //           return {
  //             id: cat._id,
  //             title: cat.title,
  //             description: cat.description.replace(/<\/?[^>]+(>|$)/g, ""),
  //             image: cat.image,
  //             status: cat.status,
  //             deletedBy: cat.deletedBy,
  //             createdAt: cat.createdAt,
  //             deletedAt: cat.deletedAt,
  //           };
  //         });
  //       }
  //       console.log(this.faqData, "this.faqData");
  //     });
  // }
  onkeyup(){
    
    this.filters.category = this.chosenMod
    this.filters.search = this.search_value
    this.sharedserviceService
      .getAllBlogs(this.filters)
      .subscribe((response: any) => {
        if (response.data.length == 0) {
          this.faqData = [];
          this.totalItems = response.total;
          console.log(this.totalItems)
        } else {
          this.totalItems = response.total;
          this.appStateSvc.stateData.loader = false
          console.log(this.totalItems)
          this.faqData = response.data.map((cat: any) => {
            return {
              id: cat._id,
              title: cat.title,
              description: cat.description.replace(/<\/?[^>]+(>|$)/g, ""),
              image: cat.image,
              status: cat.status,
              deletedBy: cat.deletedBy,
              createdAt: cat.createdAt,
              deletedAt: cat.deletedAt,
            };
          });
        }
        console.log(this.faqData, "this.faqData");
      });
  }

}
