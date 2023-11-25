import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { AppStateService } from 'src/app/shared/app-state.service';
import { BehaviorService } from 'src/app/shared/behavior.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  data: any;
  user: any;
  imageBase: any;


  Form: FormGroup;
  submitted: any = false;

  constructor(private _bs: BehaviorService,
    private appService: AppService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    public appStateSvc: AppStateService) {
    this.user = this._bs.getLocalUser()

    this.Form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],

      email_assigned_me: [''],
      email_not_assigned_transactions: [''],
      email_notification_chat: ['']
    });
  }

  ngOnInit(): void {
    this.getData()
  }

  userImg(img: any) {
    return this._bs.userImg(img)
  }



  get f() { return this.Form.controls; }

  onSubmit() {
    this.submitted = true;
    console.log("this.Form.value,", this.Form.value)
    if (!this.Form.invalid) {
      this._bs.load(true)
      this.appService.update(this.Form.value, 'user?id=' + this.appStateSvc.stateData.user.id).subscribe(res => {
        if (res.success) {
          this.router.navigateByUrl('/profile')
        }
        this._bs.load(false)
      })
    }
  }


  updateProfile() {
    this.appService.update({ image: this.data.image }, 'user?id=' + this.appStateSvc.stateData.user.id).subscribe(res => {
      if (res.success) {
        this.user.image = this.data.image
        this._bs.setUserData(this.user)
      }
    })
  }

  getData() {
    this._bs.load(true)
    this.appService.getAll('user', { id: this.appStateSvc.stateData.user.id }).subscribe(res => {
      if (res.success) {
        this.data = res.data
        // this.Form.patchValue(this.data)
        this.Form.patchValue({
          firstName: this.data.firstName,
          lastName: this.data.lastName,
        });
      }
      this._bs.load(false)
    })
  }

  uploadImage(e: any) {
    let files: FileList = e.target.files;
    this.uploadSingle(files.item(0));
  }

  uploadSingle(fileToUpload: any) {
    this._bs.load(true)
    this.appService.uploadImage(fileToUpload, 'users').subscribe((res: any) => {
      if (res.success) {
        let image = res.data.imagePath;

        if (image) {
          this.data.image = image
          this.updateProfile()
        }

      } else {
        this.toastr.error(res.error.message, 'Error');
      }
      this._bs.load(false)
      this.imageBase = '';
    }, err => {
      this.imageBase = '';
    });
  }

}
