import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from 'src/app/models/classes/auth.class';
import { Session } from 'src/app/models/classes/session.class';
import { ILoginResponse } from 'src/app/models/interfaces/response/ILoginResponse.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup;

  auth: Auth = new Auth();
  savedSession: Session | undefined;
  returnUrl: string = '';

  error: boolean = false;
  message: string = '';
  title: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    // private spinner: NgxSpinnerService
  ) {
    this.savedSession = this.authService.getSession();
    if (this.savedSession?.authenticated) this.redirectToHome();
  }

  ngOnInit() {
    this.getFormControl();

    this.activatedRoute.queryParams.subscribe((res: any) => {
      this.returnUrl = res.returnUrl;
    })

  }

  getFormControl(): void {
    this.formGroup = this.formBuilder.group({
      email: [''],
      password: ['']
    })
  }


  onSubmit(): void {

    // this.spinner.show();

    this.auth.email = this.formGroup.value.email;
    this.auth.password = this.formGroup.value.password;

    this.authService.login(this.auth).subscribe({
      next: (response: ILoginResponse) => {
        console.log(response);
        let session = new Session(response.token, response.user);
        this.authService.saveSession(session);

        if (this.returnUrl) {
          this.router.navigateByUrl(`${this.returnUrl}`);
        }
        this.redirectToHome();

      },
      error: (error) => {
        console.log(error)
        this.error = true;
        this.message = error.error.message;
        setTimeout(() => {
          this.error = false;
        }, 3000);
        // this.spinner.hide();
      },
      complete: () => {
        // this.spinner.hide();
      }
    })
  }

  redirectToHome(): void {
    this.router.navigate(['/dashboard']);
  }
}
