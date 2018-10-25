import { Component, OnInit } from '@angular/core';
import { AntennasService } from '../../antennas.service'
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Router } from "@angular/router";
@Component({
  selector: 'app-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.css']
})
export class AdressComponent {
  nameCompanies: any[];

  constructor(private antennasService: AntennasService, private confirmationService: ConfirmationService, private router: Router) { }
  dictAddress: any[];
  links = [
    {
      CompanyName: "סלקום", link: "https://www.cellcom.co.il/",label:"Cellcom",color:"cellcom"
    }, {
      CompanyName: "PHI (משרת את הוט ופרטנר)", link: "https://www.partner.co.il/#!#%2Fmain",label:"Partner",color:"partner"
    }, {
      CompanyName: "פלאפון", link: "https://www.pelephone.co.il/digitalsite/heb/home/",label:"Pelephone",color:"pelephone"
    }, {
      CompanyName: "גולן תקשורת", link: "https://www.golantelecom.co.il/web/",label:"Golan Telecom",color:"golan"
    }, {
      CompanyName: "הוט מובייל", link: "https://www.hotmobile.co.il/pages/default.aspx",label:"Hot Mobile",color:"hot"
    }
  ];
  display = false;
  bestCompanies: any[];
  map = false;
  modal = false;
  cellcom = "#800080";
  hot = "#ff0000a1"
  partner = "#f6bc54"
  golan = "#f18c9d";
  pelephone = "#54b4fa";
  showMap() {
    this.router.navigate(['/Home/Map']);
  }
  nav(link){
    this.router.navigate([link])
  }
  confirm(item) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this address?',
      accept: () => {
        this.removeAdress(item.address)
      }
    });
  }
  // showMap(){
  //   this.map=true;
  // }
  ngOnInit() {
    this.dictAddress = this.antennasService.getAllDictCompany();
  }
  bestCompany() {
    let self = this;
    this.antennasService.showsSpinner();
    this.antennasService.getBestCompany().subscribe((res: any[]) => {
      debugger;
      this.antennasService.hideSpinner(); this.bestCompanies = res;
      this.nameCompanies = Object.keys(res).map(key => ({ CompanyName: key, Density: res[key] }));
      this.nameCompanies.forEach(name => name = name.CompanyName);
      for (let i = 0; i < this.nameCompanies.length; i++) {
        this.nameCompanies[i] = this.nameCompanies[i].CompanyName;
      }
      this.links = this.links.filter(p => this.nameCompanies.indexOf(p.CompanyName)!=-1);
      this.map = false
    });
  }
  removeAdress(adress) {
    this.antennasService.removeAdress(adress);
  }
}
