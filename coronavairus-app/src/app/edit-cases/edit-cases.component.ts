import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Cases } from '../models/cases';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-cases',
  templateUrl: './edit-cases.component.html',
  styleUrls: ['./edit-cases.component.scss']
})
export class EditCasesComponent implements OnInit {

  casesForm: FormGroup;
  id = null
  name: string = '';
  gender: string = '';
  age: number = null;
  address: string = '';
  city: string = '';
  country: string = '';
  status: string = '';
  statusList = ['Positivo', 'Morto', 'Recuperado'];
  genderList = ['Masculino', 'Feminino', 'Prefiro não dizer'];
  isLoadingResults: boolean = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getCasesById(this.route.snapshot.params.id);
    this.casesForm = this.formBuilder.group({
      name : ['' ,Validators.required],
      gender : ['', Validators.required],
      age : ['', Validators.required],
      address : ['', Validators.required],
      city : ['', Validators.required],
      country : ['', Validators.required],
      status : ['', Validators.required]
    });
  }

  getCasesById(id: number) {
    this.api.getCasesById(id).subscribe((data: Cases) => {
      this.id = data.id;
      this.casesForm.setValue({
        name: data.name,
        gender: data.gender,
        age: data.age,
        address: data.address,
        city: data.city,
        country: data.country,
        status: data.status
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateCases(this.id, this.casesForm.value)
      .subscribe((res: Cases) => {
          const id = res.id;
          this.isLoadingResults = false;
          this.router.navigate(['/cases-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  casesDetails() {
    this.router.navigate(['/cases-details', this.id]);
  }

}
