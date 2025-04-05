import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { User } from "../../auth/models/user.model";

import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Wallet } from "../../models/wallet/wallet.models";
import { Transaction } from "../models/transaction.models";


@Injectable({  providedIn: 'root' })

export class AdminService {

  private readonly urlBackend : string = environment.urlBackend;

  constructor( private http : HttpClient ) {}

  // getusers
  public getUsers () : Observable<User[]> {
    const token = localStorage.getItem('token');

    if ( !token )
      return of([]);

    const headers = new HttpHeaders({
      'authorization' : token
    });

    return this.http.get<User[]>(`${this.urlBackend}/admin/users`, { headers } );
  };

  //getwalletbyid
  public getWalletByID ( idUser : Wallet['idUser']) : Observable<Wallet | null> {
    const token = localStorage.getItem('token');

    if ( !token )
      return of(null);

    const headers = new HttpHeaders({
      'authorization' : token
    });

    return this.http.get<Wallet>(`${this.urlBackend}/admin/walletByID/${ idUser }`, { headers });
  }

  // gettransaciones

  public getTransacciones () : Observable<Transaction[]> {
    const token = localStorage.getItem('token');

    if ( !token )
      return of([]);

    const headers = new HttpHeaders({
      'authorization' : token
    });

    return this.http.get<Transaction[]>(`${this.urlBackend}/admin/transacciones`, { headers });
  }



}
