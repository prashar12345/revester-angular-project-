import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { ConfirmMatch } from 'src/app/shared/confirm-match.validator';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  loginForm: FormGroup;
  submitted:any = false;
  showPass:any = false;

  constructor(private fb:FormBuilder,
    private _bs:BehaviorService,
    private appService:AppService,
    private router:Router,
    private toastr:ToastrService) {

    if(_bs.getLocalUser()){
      router.navigateByUrl('/')
    }

    this.loginForm = this.fb.group({
      code: ["", [Validators.required]],
      newPassword: ["", [Validators.required, Validators.minLength(9)]],
      confirmPassword:["", [Validators.required, Validators.minLength(9)]]
    },
		{
      validator: ConfirmMatch('newPassword', 'confirmPassword')
    });
  }

  ngOnInit(): void {
  }

  get f() { return this.loginForm.controls;}

  onSubmit(){
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this._bs.load(true);

    this.appService.update(this.loginForm.value, 'reset/password').subscribe((res: any) => {
      if (res.success) {
        this._bs.load(false);
        this.router.navigateByUrl('/auth/login');
        this.toastr.success(res.message)
      } else {
        this.toastr.error(res.message)
      }
      this._bs.load(false)
    }, error => {
      this._bs.load(false)
    });

  }
}
