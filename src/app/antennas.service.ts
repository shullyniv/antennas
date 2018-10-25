import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
@Injectable()
export class AntennasService {
  showSpinner: boolean=false;
  private listToRemove = [];
  private dictList: any[] = [];
  private bestCompanies: any[] = [];
  private companyList: any[] = [];
public isBest:boolean=false;
  constructor(private http: HttpClient,private router: Router) {

  }
  showsSpinner() {
    this.showSpinner = true;
  }
  hideSpinner() {
    this.showSpinner = false;
  }
  getDictCompany(address: string, x, y) {
    // this.showsSpinner();
    if(this.isBest==true)
    {this.dictList.slice(this.dictList.indexOf(this.dictList.length,1));
      this.isBest=false;
    }

    return this.http.get(`http://localhost:54599/api/radius?x=${x}&y=${y}`).subscribe((res) => {
      // this.hideSpinner();
      // id: this.dictList.length + 1
      this.dictList.reverse().push({ address, antennas: res });
      const companies = Object.keys(res).map(key => ({ CompanyName: key, Density: res[key] }));
      this.companyList.push(...companies); 
    },
      err => { this.hideSpinner();  this.router.navigate(['/NotFound']);  });

  }
  getBestCompany() {
    this.showsSpinner();
    const companies = this.companyList;
    return this.http.post(`http://localhost:54599/api/company`, companies)
    
  }
  getAllDictCompany() {
    return this.dictList.reverse();
  }

  getStatisticCompany() {
    return this.http.get(`http://localhost:54599/api/company`);
  }
  removeAdress(adress) {
    
    this.listToRemove =JSON.parse(JSON.stringify(this.dictList.find(item => item.address == adress).antennas)) ;
    this.companyList.forEach(p => {
      p.Density = p.Density - this.listToRemove[p.CompanyName];
    
      this.listToRemove[p.CompanyName]=0;
    }) 
    if(this.isBest==true)
    {this.dictList.slice(this.dictList.indexOf(this.dictList.length,1));
      this.isBest=false;
    }
    this.dictList.splice(this.dictList.indexOf(this.dictList.find(item => item.address == adress)), 1);
 
  }
}
