import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PageServiceService } from '../page-service.service'
import { FormBuilder, FormGroup, FormControlName,FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  description: any;
  contactForm:FormGroup
  submitted:any
  constructor(private router : Router,
    private _activateRouter: ActivatedRoute,
    private pageserviceservice: PageServiceService,
    private fb : FormBuilder, 
    private toastr:ToastrService,
    ) {
      this.contactForm=this.fb.group({
        firstName: ['',[Validators.required, Validators.maxLength(20)]],
        lastName: ['',[Validators.required, Validators.maxLength(20)]],
        email: [
          "",
          [
            Validators.required,
            Validators.email,
            Validators.pattern(
              "^[a-zA-Z0-9._%. +-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}.$"
            ),
          ]
        ],
        phone: ['',[Validators.required]],
      }
       
      )
     }

    _baseUrl = environment.apiUrl;

    public contentID: any;
    public content: any = [];
  ngOnInit(): void {
   
      this.pageserviceservice.get("contact-us").subscribe((res: any) => {
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
  onSubmit(){
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }
  }
  get f() {
    return this.contactForm.controls;
  }
 
  
}
