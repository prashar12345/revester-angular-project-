import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppStateService } from 'src/app/shared/app-state.service';
import { environment } from 'src/environments/environment';
import { PageServiceService } from '../page-service.service';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  Aboutus: any;
  description: any;

  constructor(
    private router : Router,
    private _activateRouter: ActivatedRoute,
    private pageserviceservice: PageServiceService ,
    public appStateSvc: AppStateService
  ) { }
  _baseUrl = environment.apiUrl;
  public content: any = [];

  ngOnInit(): void {
    // this.appStateSvc.loader$.subscribe(
    //   val=>{
        
    //   })
      this.appStateSvc.stateData.loader = true
      this.pageserviceservice.get("about-us").subscribe((res: any) => {
        if (res.success) {
          this.content = res.data;
      this.appStateSvc.stateData.loader = false
        } else {
          
          // this.toastr.error(res.error.message, 'Error');
        }
      },
      // error => {
      //   this.ngxNotificationMsgService.open({
      //     status: NgxNotificationStatusMsg.FAILURE,
      //     header: '',
      //     messages: [error]
      //  });
      //   // this.toastr.error(error, 'Error');
      // }
      );
   
  }
}
