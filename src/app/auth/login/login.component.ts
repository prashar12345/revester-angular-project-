import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { AppStateService } from 'src/app/shared/app-state.service';
import { BehaviorService } from 'src/app/shared/behavior.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: any = false;
  showPass: any = false;
  rememberMe: boolean = false;
  constructor(private fb: FormBuilder,
    private _bs: BehaviorService,
    private appService: AppService,
    private router: Router,
    private toastr: ToastrService,
    public appStateSvc: AppStateService) {

    if (_bs.getLocalUser()) {
      router.navigateByUrl('/')
    }

    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(
          "^[a-zA-Z0-9._%. +-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}.$"
        ),
      ],],
      password: ['', [Validators.required]],
      remember: ['',],
    });
  }
  markRemember() {
    this.rememberMe = !this.rememberMe;
  }

  ngOnInit(): void {
    if (localStorage.getItem('remember')) {
      this.loginForm.patchValue({
        email: JSON.parse(localStorage.getItem('remember') || '{}'),
        password: JSON.parse(localStorage.getItem('rememberPassword') || '{}')
      });
    }
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    console.log(this.loginForm.value);


    this._bs.load(true);

    this.appService.add(this.loginForm.value, 'signin').subscribe((res: any) => {
      if (res.success) {
        if (this.rememberMe) {
          let rememberData = this.loginForm.controls.email.value;
          let rememberPassword = this.loginForm.controls.password.value;
          localStorage.setItem("remember", JSON.stringify(rememberData));
          localStorage.setItem("rememberPassword", JSON.stringify(rememberPassword));
        }
        console.log('res', res);
        
        const state = this.appStateSvc.stateData;
        state.user = "";
        state.user = res.data
        state.userId = res.data.id
        state.subcriptionValid = res.data.subscriptionPlan
        if (res.data.subscriptionPlan) {
          state.subcriptionStatus = true
        }
        if (res.data) {
          state.isLoggedIn = true
        }
        console.log(state);
        const result = res.data;
        this._bs.load(false);
        this._bs.setUserData(result)
        this.loginForm.reset();
        this.router.navigate(['/']);

      } else {
        this.toastr.error(res.message)
      }
      this._bs.load(false)
    }, error => {
      this._bs.load(false)
    });

  }

}
