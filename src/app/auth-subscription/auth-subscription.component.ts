import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-subscription',
  templateUrl: './auth-subscription.component.html',
  styleUrls: ['./auth-subscription.component.scss']
})
export class AuthSubscriptionComponent implements OnInit {
  user: any;
  lodingcard=[1,2,3,4,5,6];
  loader: boolean = false;
  constructor(
    private router: Router,
  ) { }
  card_added: boolean = false;
  loginModal: boolean = false;
  ngOnInit(): void {
    this.loader = true;
    this.user =localStorage.getItem('credentials')
      this.user=JSON.parse(this.user)
    if(this.user == null){
    this.loginModal = true;
    }else
    {
    this.card_added = true; 
    }
  }
  pay_subscription()
  {
    this.router.navigate(['/subscriptionplan']);
  }
  ok()
  {
    this.router.navigate(['']);
  }
}
