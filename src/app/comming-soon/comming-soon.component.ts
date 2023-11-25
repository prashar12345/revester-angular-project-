import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CountdownConfig } from 'ngx-countdown';
import { format } from 'date-fns';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorService } from '../shared/behavior.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.service';

@Component({
  selector: 'app-comming-soon',
  templateUrl: './comming-soon.component.html',
  styleUrls: ['./comming-soon.component.scss']
})
export class CommingSoonComponent implements OnInit {
  // @ViewChild('days') days: ElementRef;
  // @ViewChild('hours') hours: ElementRef;
  // @ViewChild('mins') mins: ElementRef;
  // @ViewChild('seconds') seconds: ElementRef;
  registerForm: FormGroup | any;
  cardModal:Boolean=false;

  subsModal:Boolean=false;
  submitted = false;
  get f() { return this.registerForm.controls;}

  constructor(private fb: FormBuilder,
    private _bs:BehaviorService,
    private toastr:ToastrService,
    private appService:AppService,) { }
  // format: 'yyyy-MM-dd-HH:mm:ss a',

  config: CountdownConfig = {
    leftTime: 60 * 60 * 24 * 365 * (2050 - 1970),
    format: 'dd HH:mm:ss',
    formatDate: ({ date, formatStr }) => format(date, formatStr),
  };

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      // name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,Validators.pattern(
        "^[a-zA-Z0-9._%. +-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}.$"
      )]],
      // phone: ['', [Validators.required]],
    });
  }
  onSubmit() {
    this.cardModal=true;
  }

openCard(){
  this.cardModal=true
}

  subscribe(){
    this.submitted = true;
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.appService.subscribe(this.registerForm.value).subscribe((res: any) => {
        if (res.success) {
          const result = res.data;
          this.subsModal=true
          this.registerForm.reset()
          this.cardModal = false
        } else {
          this.toastr.error(res.message)
        }
        this._bs.load(false)
      });
    }
  }



}

