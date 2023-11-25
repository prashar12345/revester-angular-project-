import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppStateService } from 'src/app/shared/app-state.service';
import { SharedserviceService } from 'src/app/shared/sharedservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  _baseUrl = environment.apiUrl;
  public blogID: any;
  public blog: any = [];
  conditionalForm: boolean = false;
  id2: any;
  description: any;
  constructor(

    private router: Router,
    private _activateRouter: ActivatedRoute,
    private sharedserviceService: SharedserviceService,
    public appStateSvc : AppStateService
  ) { }
  ngOnInit() {
    this.appStateSvc.stateData.loader = true; 
    this.blogID = this._activateRouter.snapshot.params["id"];
    console.log(this.blogID)
    if (this.blogID) {
      // this.conditionalForm = true;
      this.sharedserviceService.get(this.blogID).subscribe(
        (res: any) => {
          if (res.success) {
            this.appStateSvc.stateData.loader = false
            this.blog = res.data;
            this.description = res.data.description.replace(/<\/?[^>]+(>|$)/g, "")
            console.log("this.blog", this.blog);
          } else {
            // this.ngxNotificationMsgService.open({
            //   status: NgxNotificationStatusMsg.FAILURE,
            //   header: "",
            //   messages: [res.error.message],
            // });
          }
        },
        (error) => {
        }
      );
    } else {
      // this.conditionalForm = false;d
    }
  }
}
