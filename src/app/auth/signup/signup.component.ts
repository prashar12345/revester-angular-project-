import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { FormBuilder, FormGroup, FormControlName,FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { ConfirmMatch } from "src/app/shared/confirm-match.validator";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  showPassword = false;
  sigupFrom:FormGroup
  submitted:any
  formsign: boolean =true
  showPass:any = false;
  cshowPass:any = false;
  modal:any=false;
  popupmodal :boolean =false
  input: any;
  context: any;
  statusOfRes: boolean =false;
  constructor(
    private _bs:BehaviorService,
    private router:Router,
    private fb : FormBuilder,
    private appService:AppService,
    private toastr:ToastrService,
  ) {
    if(_bs.getLocalUser()){
      router.navigateByUrl('/')
    }

    this.sigupFrom=this.fb.group({
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

      password: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          // Validators.pattern(
          //   "(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>\"'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}"
          // ),
        ],
      ],
      confirmpassword: ["", Validators.required],
      Terms: [false, Validators.requiredTrue]
    },
    {
      validator: ConfirmMatch("password", "confirmpassword"),
    }
    )
  }

  ngOnInit(): void {
  }
  toggleShow() {
    this.showPassword = !this.showPassword;
    this.input.type = this.showPassword ? 'text' : 'password';
  }
  hide : boolean = true;

myFunction() {
  this.hide = !this.hide;
}
  onSubmit(){
    this.submitted = true;
    if (this.sigupFrom.invalid) {
      return;
    }
  }
  signupUser(){
    console.log(this.sigupFrom.controls)
    
    if (!this.sigupFrom.invalid) {
      

    this.appService.signup(this.sigupFrom.value).subscribe((res: any) => {
      if (res.success) {
        const result = res.data;
        this.statusOfRes= true
        this.formsign = false
        this._bs.load(false);
        this._bs.setUserData(result)
        

      } else {
        this.toastr.error(res.message)
      }
      this._bs.load(false)
    }, error => {
      this._bs.load(false)
    });
    // this.sigupFrom.reset();
  }
  }
  get f() {
    return this.sigupFrom.controls;
  }
  resent()
  {
    this.appService.resendverification().subscribe((res: any) => {
      if (res.success) {
        const result = res.data;
        this._bs.load(false);
        this._bs.setUserData(result)
        this.sigupFrom.reset();

      } else {
        this.toastr.error(res.message)
      }
      this._bs.load(false)
    }, error => {
      this._bs.load(false)
    });
    
  }

   
 
  


}
