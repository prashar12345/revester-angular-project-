import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { BehaviorService } from 'src/app/shared/behavior.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  data:any;
  user:any;
  imageBase:any;
  constructor(private _bs:BehaviorService,
  private appService:AppService,
  private toastr:ToastrService) {
    this.user=this._bs.getLocalUser()
  }

  ngOnInit(): void {
    this.getData()
  }

  userImg(img:any){
    return this._bs.userImg(img)
  }

  updateProfile(){
    this.appService.update({image:this.data.image},'user?id='+this.user.id).subscribe(res=>{
      if(res.success){
        this.user.image=this.data.image
        this._bs.setUserData(this.user)
      }
    })
  }

  getData(){
    this._bs.load(true)
    this.appService.getAll('user',{id:this.user.id}).subscribe(res=>{
      if(res.success){
        this.data=res.data
      }
      console.log(this.data);
      this._bs.load(false)
    })
  }

  uploadImage(e: any) {
    let files: FileList = e.target.files;
    this.uploadSingle(files.item(0));
  }

  uploadSingle(fileToUpload:any) {
    this._bs.load(true)
    this.appService.uploadImage(fileToUpload, 'users').subscribe((res: any) => {
      if (res.success) {
        let image = res.data.imagePath;

        if (image) {
          this.data.image=image
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
