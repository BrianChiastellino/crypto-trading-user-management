import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, catchError, filter, map, of, switchMap, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { UserLoginDTO } from '../models/user-login.interface';
import { LoginResponse } from '../models/login-response.interface';

@Injectable({  providedIn: 'root' })

export class AuthService {

  private baseUrl: string = environment.urlBaseJsonServer;
  private token: string = environment.userToken
  private isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  private readonly urlBackend : string = environment.urlBackend;




  constructor(private http: HttpClient) { }


  //todo: Termianr con backend todas las funciones

  public login( userLoginDTO : UserLoginDTO ): Observable<LoginResponse | null> {
    if (!userLoginDTO) return of(null);

    return this.http.post<LoginResponse>(`${ this.urlBackend}/auth/login`, userLoginDTO)
  }

  public register ( user : User ) : Observable<User | null> {
    return this.http.post<User>(`${ this.urlBackend}/auth/register`, user )
    .pipe(
      tap( user => console.log({ user })),
    );
  };

  // -------------------------------------------------------

  public updateUser( user: User ): Observable<User | null> {
    const token = localStorage.getItem('token');
    if (!user || !token ) return of(null);

    console.log({ token });

    const headers = new HttpHeaders({
      'authorization' : token
    });

    return this.http.put<User>(`${ this.urlBackend }/users/${ user.id }`, user, { headers });

    // return this.validateUser(user, user.id).pipe(
    //   switchMap(isValid => {
    //     if (!isValid) {
    //       return of(null); // Retorna null si el usuario ya existe con el mismo email, username o documento
    //     }

    //     return this.http.patch<User>(`${this.baseUrl}/users/${user.id}`, user);
    //   })
    // );
  }

  // ------------------------ ADMIN ------------------------------- //

  // public get getAllUsers(): Observable<User[]> {
  //   const token = localStorage.getItem('token');

  //   if ( !token )
  //     return of([]);

  //   const headers = new HttpHeaders({
  //     'authorization' : token
  //   });

  //   console.log({ token });

  //   return this.http.get<User[]>(`${ this.urlBackend }/admin/users`, { headers });
  // };






  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  public isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  // CRUD



  public addUser(user: User): Observable<User | null>{

    if( !user) return of(null);

    return this.http.post<User>(`${ this.baseUrl }/users`, user);

  }



  public deleteUserById(id: string): Observable<boolean> {

    if ( !id ) return of ( false );

    return this.getUserById(id)
      .pipe(
        switchMap( user => {
          if ( user?.admin ) {
            return of ( false )
          }

          return this.http.delete(`${this.baseUrl}/users/${id}`)
            .pipe(
              map( resp => true )
            )
        })
      )
  }

  //todo: cambiar por urlbackend
  public getUserById(id: User['id']): Observable<User | null> {
    const token = localStorage.getItem('token');
    if (!id || !token) return of(null);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<User>(`${this.urlBackend}/users/${id}`, { headers });
  }

  public changePassword ( id : User['id'],  currentPassword : string, newPassword : string ) : Observable<User | null> {

    const token = localStorage.getItem('token');
    if ( !id || !token) {
      return of(null)
    }

    const headers = { Authorization: `Bearer ${token}` };

    return this.http.put<User>(`${this.urlBackend}/users/password/${id}`, { currentPassword, newPassword }, { headers });

  }


  // LOGUEO USUARIO



  public logOut (): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoginSubject.next(false);
  }


  // AUTENTICACION

  public checkAuthentication(): Observable<boolean> {

    if( !localStorage.getItem('token') ) return of(false);

    return localStorage.getItem('token') ? of(true) : of(false)

  }

  public checkAuthenticationAdmin() : Observable<boolean> {

    const user: User = JSON.parse( localStorage.getItem('user')!)

    if ( !user ) return of(false);

    return user.admin ? of(true) : of(false);

  }

  // REGISTRO USUARIO

  // public registerUser(user: User): Observable<User | null> {
  //   if (!user) return of(null);

  //   return this.getAllUsers.pipe(
  //     switchMap(users => {
  //       if (users.length === 0) {
  //         user.admin = true;
  //       }
  //       return this.validateUser(user);
  //     }),
  //     switchMap(isValid => {
  //       if (!isValid) {
  //         return of(null);
  //       }
  //       return this.addUser(user).pipe(
  //         map(() => user),
  //         catchError(() => of(null))
  //       );
  //     }),
  //     catchError(() => of(null))
  //   );
  // }


// public validateUser(user: User, userId?: string): Observable<boolean> {
//   return this.getAllUsers.pipe(
//     map(users => {
//       // Excluir al usuario actual de la validación si se proporciona userId
//       const isValid = users.find(u =>
//         (u.username === user.username || u.email === user.email || u.document === user.document) &&
//         u.id !== userId
//       );
//       return !isValid; // Retorna true si no se encuentra un usuario existente, es decir, es válido
//     })
//   );
// }



}
