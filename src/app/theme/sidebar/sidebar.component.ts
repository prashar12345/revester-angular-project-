import { Component, OnInit } from '@angular/core';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  user:any;
  _host:any = environment.apiUrl;
  toggle:any=false;
  constructor(private _bs:BehaviorService) {
    this._bs.getUserData().subscribe((res: any) => {
      if(res){
        this.user = res
      } else{
        this.user = _bs.getLocalUser()
      }
    });
  }

  ngOnInit(): void {
  }

  userImg(img:any){
    let value = './assets/img/profile.jpg';

    if(img && img.includes('https://')){
      value = img;
    }
    else if(img){
      value = this._host+img
    }

    return value;
  }


  openNav(){
    this.toggle=!this.toggle
  }

}
