import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { Trip } from "../models/trip";

@Injectable()
export class TripDataService {
  constructor(private http: Http) {}

  private apiBaseUrl = "http://localhost:3000/api/";
  private tripUrl = `${this.apiBaseUrl}trips/`;

  public getTrip(tripCode: string): Promise<Trip> {
    console.log("Inside TripDataService#getTrip(tripCode)");
    return this.http
      .get(this.tripUrl + tripCode)
      .toPromise()
      .then((res) => res.json() as Trip)
      .catch(this.handleError);
  }

  public getTrips(): Promise<Trip[]> {
    console.log("Inside TripDataService#getTrips");
    return this.http
      .get(this.tripUrl)
      .toPromise()
      .then((res) => res.json() as Trip[])
      .catch(this.handleError);
  }

  public addTrip(formData: Trip): Promise<Trip> {
    console.log("Inside TripDataService#addTrip");
    return this.http
      .post(this.tripUrl, formData)
      .toPromise()
      .then((res) => res.json() as Trip[])
      .catch(this.handleError);
  }

  public updateTrip(formData: Trip): Promise<Trip> {
    console.log("Inside TripDataService#updateTrip");
    console.log(formData);
    return this.http
      .put(this.tripUrl + formData.code, formData)
      .toPromise()
      .then((res) => res.json() as Trip[])
      .catch(this.handleError);
  }

  public deleteTrip(trip: Trip): void {
    console.log("Inside TripDataService#deleteTrip");
    console.log(trip);
    this.http
      .delete(this.tripUrl + trip.code, trip.code)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log("something has gone wrong", error); // display the error
    return Promise.reject(error.message || error);
  }
}