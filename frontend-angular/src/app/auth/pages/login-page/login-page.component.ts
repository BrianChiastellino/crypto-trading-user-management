import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';
import { environment } from '../../../../environments/environment';
import { CustomValidators } from '../../../shared/validators/custom-validators';
import { CustomHelpers } from '../../../shared/helpers/custom-helpers';
import { UserLogin } from '../../models/user-login.interface';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})

export class LoginPageComponent {

  public hidePassword: boolean = true;
  private userToken: string = environment.userToken;

  public loginForm: FormGroup = this.fb.group({
    identifier: ['', [Validators.required, Validators.pattern(CustomValidators.emailPattern)]],
    password: ['', [Validators.required, Validators.pattern(CustomValidators.passwordPattern)]]
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastService
  ) { }

  public onSubmit(): void {

    if (!this.loginForm.valid) return;

    this.login();

  }

  public login(): void{

      const identifier = this.loginForm.controls['identifier'].value;
      const password = this.loginForm.controls['password'].value;

      const userlogin : UserLogin = { password };

      if (identifier.includes('@')) {
        userlogin.email = identifier;    // Si tiene @, es email
      } else if (!isNaN(Number(identifier))) {
        userlogin.document = identifier; // Si es número, es documento
      } else {
        userlogin.username = identifier; // Sino, es username
      }

      this.authService.login( userlogin ).subscribe({
        next : ( response ) => {
          if ( !response )
            throw Error();

          const { token, user } = response;

          localStorage.setItem(this.userToken, JSON.stringify(user));

          if(user.admin) this.router.navigateByUrl('/admin/landing')
          else  this.router.navigateByUrl('/landing');

          this.toastService.showSuccess(`Éxito!`, 'Has iniciado sesion correctamente');
        },
        error : ( error  ) => {
          this.loginForm.reset();
          this.toastService.showError('Error', 'Usuario o contraseña incorrecto');
        }
      })
  }

  public showPassword () : void  {
    this.hidePassword = !this.hidePassword;
  }

  public isValidfield( field: string ): boolean | null {
    return CustomHelpers.isValidField( field, this.loginForm );
  }


}
