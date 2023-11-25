import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class BehaviorService {

    public userData = new BehaviorSubject<any>(null);
    public transferid = new BehaviorSubject<any>(null);
    public transferAtomID = new BehaviorSubject<any>(null);
    public documentData = new BehaviorSubject<any>(null);
    rootUrl: string = environment.apiUrl;
    constructor(private router: Router) {}

    signOut(): void {
        this.router.navigateByUrl('/auth');
        localStorage.removeItem('credentials')
        this.setUserData(null)
    }
    transferAtomID1(id:any) {
    
        this.transferAtomID.next(id);
    }
    transferAtomIDreturn() {
        return this.transferAtomID.asObservable();
    }
    document(data:any) {
    
        this.documentData.next(data);
    }
    documentReturn() {
        return this.documentData.asObservable();
    }

    setUserData(data:any) {
        if(data){
           let user = JSON.stringify(data)
           localStorage.setItem('credentials', user)
        }else{
            localStorage.removeItem('credentials');
        }
        this.userData.next(data);
    }

    getLocalUser(){
        let data:any;
        let user:any = localStorage.getItem('credentials')
        if(user) data = JSON.parse(user)
        return data;
    }

    getUserData() {
        return this.userData.asObservable();
    }

    load(p:any){
        if(p){
            this.loadOn()
        }else{
            this.loadOff()
        }
    }

    closeModal() {
        document.getElementById('body')?.classList.remove('modal-open');
    }

    openModal() {
        document.getElementById('body')?.classList.add('modal-open');
    }

    loadOn() {
        document.getElementById('loaderDiv')?.classList.remove('d-none');
    }

    loadOff() {
        document.getElementById('loaderDiv')?.classList.add('d-none');
    }

    userImg(img:any){
        let value = './assets/img/profile.png';
    
        if(img && img.includes('https://')){
          value = img;
        }
        else if(img){
          value = this.rootUrl+img
        }
    
        return value;
  }


  dateToString(p:Date){
    return `${p.getFullYear()}-${p.getMonth()+1}-${p.getDate()}`
  }

  shareId(data:any) {
    
    this.transferid.next(data);
}
shareIdReturn() {
    return this.transferid.asObservable();
}


  stringToDate(p:any,minusPlusDate=0){
    let prm:any = []
   let ps = String(p)
   prm = ps.split('-');
   let d = p.split('-')
   let date = new Date()
   date.setFullYear(d[0])
   date.setMonth(Number(d[1])-1)
   date.setHours(0)
   date.setMinutes(0)
   date.setSeconds(0)
   date.setMilliseconds(0)
   date.setDate(Number(d[2])+minusPlusDate)
   return date;
  }
    
}
