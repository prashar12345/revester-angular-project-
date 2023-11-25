import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { AppService } from 'src/app/app.service';
import { BehaviorService } from 'src/app/shared/behavior.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public header: boolean = false;
  public footer: boolean = false;
  user: any;
  user_data: any;
  url: string = "";

  constructor(private _router: Router,
    private _bs: BehaviorService,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService) {
    this._router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      if (evt.url.indexOf('/verify/user?id=') === 0) {
        // console.log(evt.url.indexOf('/verify/user?id='));
        this.route.queryParams.subscribe(params => {
          let user_id = params['id'];
          localStorage.setItem("user_id", user_id);
          // alert(user_id);
          // window.location.reload();
          this.router.navigate(['/']);
          // this.refreshPage()
        });
      }
      if (
        evt.url.includes("comingsoon")

      ) {
        // console.log("false")
        this.header = false;
        this.footer = false;

      }
      else {

        this.header = true;
        // console.log("true")
        this.get_user_id()
        this.footer = true;
      }
    })
  }
  ngOnInit(): void {

  }

  // console.log(this.router.url,"evt.url");
  get_user_id() {
    if (localStorage.getItem("user_id")) {
      let user_id = localStorage.getItem("user_id");
      this.appService.autoLogin(user_id).subscribe(
        (res: any) => {
          if (res.success) {
            this.user_data = res.data;
            console.log("this.user_data", this.user_data);
            localStorage.setItem("credentials", JSON.stringify(res.data));
            localStorage.removeItem('user_id');
          }
          window.location.reload();
        }

      );
    }

  }
}
