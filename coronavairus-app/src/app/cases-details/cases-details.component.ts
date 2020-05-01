import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Cases } from '../models/cases';
@Component({
  selector: 'app-cases-details',
  templateUrl: './cases-details.component.html',
  styleUrls: ['./cases-details.component.scss']
})
export class CasesDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  cases: Cases = { id: null, name: '', gender: '', age: null, address: '', city: '', country: '', status: '', created: null, updated: null };
  isLoadingResults = true;

  ngOnInit(): void {
    this.getCasesDetails(this.route.snapshot.params.id);

  }
  getCasesDetails(id : number){
      this.api.getCasesById(id).subscribe((data:Cases) => {
      this.cases = data;
      console.log(this.cases);
      this.isLoadingResults = false;
    });
  }

  deleteCases(id: any) {
    this.isLoadingResults = true;
    this.api.deleteCases(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/cases']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  setColor(status: string) {
    let color: string;
    if (status === 'Positive') {
      color = 'orange-color';
    } else if (status === 'Recovered') {
      color = 'green-color';
    } else {
      color = 'red-color';
    }

    return color;
  }

}
