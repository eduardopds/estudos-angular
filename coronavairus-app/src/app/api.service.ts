import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Cases } from './models/cases';
import { Statistic } from './models/statistic';
import { environment } from 'src/environments/environment';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl =  environment.API + 'cases'

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor(private http: HttpClient) { }
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {

			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}

	getCases(): Observable<Cases[]> {
		return this.http.get<Cases[]>(`${apiUrl}`)
			.pipe(
				tap(cases => console.log('fetched cases')),
				catchError(this.handleError('getCases', []))
			);
	}

	getCasesById(id: number): Observable<Cases> {
		const url = `${apiUrl}/${id}`;
		return this.http.get<Cases>(url).pipe(
			tap(_ => console.log(`fetched cases id=${id}`)),
			catchError(this.handleError<Cases>(`getCasesById id=${id}`))
		);
	}

	addCases(cases: Cases): Observable<Cases> {
		return this.http.post<Cases>(apiUrl, cases, httpOptions).pipe(
			tap((c: Cases) => console.log(`added cases w/ id=${c.id}`)),
			catchError(this.handleError<Cases>('addCases'))
		);
	}

	updateCases(id: number, cases: Cases): Observable<any> {
		const url = `${apiUrl}/${id}`;
		return this.http.put(url, cases, httpOptions).pipe(
			tap(_ => console.log(`updated cases id=${id}`)),
			catchError(this.handleError<any>('updateCases'))
		);
	}

	deleteCases(id: number): Observable<Cases> {
		const url = `${apiUrl}/${id}`;
		return this.http.delete<Cases>(url, httpOptions).pipe(
			tap(_ => console.log(`deleted cases id=${id}`)),
			catchError(this.handleError<Cases>('deleteCases'))
		);
	}

	getStatistic(status: string): Observable<Statistic> {
		const url = `${apiUrl}/statistics/${status}`;
		return this.http.get<Statistic>(url).pipe(
			tap(_ => console.log(`fetched statistic status=${status}`)),
			catchError(this.handleError<Statistic>(`getStatistic status=${status}`))
		);
	}
}

