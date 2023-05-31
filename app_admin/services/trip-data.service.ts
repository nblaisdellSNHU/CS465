import { Inject, Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";

import { Trip } from "../models/trip";
import { User } from "src/app/models/user";
import { AuthResponse } from "src/app/models/authresponse";
import { BROWSER_STORAGE } from "src/app/storage";

@Injectable()
export class TripDataService {
  constructor(
    private http: Http,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

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

  public getHeaders(): Headers {
    return new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("travlr-token")}`,
    });
  }

  public addTrip(formData: Trip): Promise<Trip> {
    console.log("Inside TripDataService#addTrip");
    return this.http
      .post(this.tripUrl, formData, { headers: this.getHeaders() })
      .toPromise()
      .then((res) => res.json() as Trip[])
      .catch(this.handleError);
  }

  public updateTrip(formData: Trip): Promise<Trip> {
    console.log("Inside TripDataService#updateTrip");
    console.log(formData);
    return this.http
      .put(this.tripUrl + formData.code, formData, {
        headers: this.getHeaders(),
      })
      .toPromise()
      .then((res) => res.json() as Trip[])
      .catch(this.handleError);
  }

  public deleteTrip(trip: Trip): void {
    console.log("Inside TripDataService#deleteTrip");
    console.log(trip);
    this.http
      .delete(this.tripUrl + trip.code, { headers: this.getHeaders() })
      .toPromise()
      .catch(this.handleError);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall("login", user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall("register", user);
  }

  public makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}${urlPath}`;
    return this.http
      .post(url, user)
      .toPromise()
      .then((res) => res.json() as AuthResponse)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log("something has gone wrong", error); // display the error
    return Promise.reject(error.message || error);
  }
}
