import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PageServiceService } from '../page-service.service'
@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(private router : Router,
    private _activateRouter: ActivatedRoute,
    private pageserviceservice: PageServiceService ) { }

    _baseUrl = environment.apiUrl;

    public contentID: any;
    public content: any = {};
    ngOnInit(): void {
   
      this.pageserviceservice.get("privacy-policies").subscribe((res: any) => {
        if (res.success) {
          this.content = res.data;
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
