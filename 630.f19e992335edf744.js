"use strict";(self.webpackChunkconnections=self.webpackChunkconnections||[]).push([[630],{3630:(j,f,l)=>{l.r(f),l.d(f,{AuthModule:()=>M});var g=l(6814),w=l(1921),u=l(3573),n=l(6223),e=l(5879),_=l(9862),P=l(2326);let C=(()=>{class t{constructor(r){this.http=r,this.regApi=P.Pn.register}regUser(r){const{name:o,email:a,password:s}=r,p={name:o,email:a,password:s},d=new _.WM({"Content-Type":"application/json"});return this.http.post(this.regApi,p,{headers:d})}static#e=this.\u0275fac=function(o){return new(o||t)(e.LFG(_.eN))};static#t=this.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Z=l(485),h=l(2296),v=l(2032),m=l(5683),c=l(5195);function T(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Please enter a name!"),e.qZA())}function b(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"The name is too long!"),e.qZA())}function A(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Please enter a valid name!"),e.qZA())}function S(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Please enter a e-mail!"),e.qZA())}function F(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Please enter a valid email!"),e.qZA())}function U(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Email already exists!"),e.qZA())}function I(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Please enter a password!"),e.qZA())}function y(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"The password is too short!"),e.qZA())}function q(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Password should contain at least one digit"),e.qZA())}function k(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Password should contain at least one uppercase letter"),e.qZA())}function N(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Password should contain at least one special character"),e.qZA())}const J=/^[\p{L} ]+$/u;let R=(()=>{class t{constructor(r,o,a,s){this.fb=r,this.router=o,this.regService=a,this.toastService=s,this.duplicateEmails=[],this.isSubmitting=!1,this.emailValidator=p=>this.duplicateEmails.includes(p.value)?{taken:!0}:null,this.regForm=this.fb.group({name:["",[n.kI.required,n.kI.pattern(J),n.kI.maxLength(40)]],email:["",[n.kI.required,n.kI.email,this.emailValidator]],password:["",[n.kI.required,n.kI.minLength(8),t=>{const i=t.value,r=/[0-9]/.test(i),o=/[A-Z]/.test(i),a=/[*!@#$%^&(){}[\]:;<>,.?~_+\-=|\\/"']/g.test(i),s={};return r||(s.hasDigit=!0),o||(s.hasUpperCase=!0),a||(s.hasSpecialChar=!0),Object.keys(s).length?s:null}]]})}get name(){return this.regForm.get("name")}get email(){return this.regForm.get("email")}get password(){return this.regForm.get("password")}register(){if(this.regForm.invalid)return;this.isSubmitting=!0;const r=this.prepareRegData();this.regService.regUser(r).subscribe({next:()=>{this.handleRegistrationSuccess()},error:o=>{this.handleRegistrationError(o)}})}prepareRegData(){const{name:r,email:o,password:a}=this.regForm.value;return{name:r??"",email:o??"",password:a??""}}handleRegistrationSuccess(){this.isSubmitting=!1,this.toastService.showSuccess("Registration successful!"),this.regForm.reset(),this.router.navigate(["auth","signin"])}handleRegistrationError(r){switch(this.isSubmitting=!1,r.error.type){case"InvalidFormDataException":this.handleInvalidFormDataError(r.error.message);break;case"PrimaryDuplicationException":this.handleUserExistsError(r.error.message);break;default:this.toastService.showError("An error occurred. Please try again.")}}handleInvalidFormDataError(r){r.includes("Parameters")?this.handleFormDataRequired(r):this.toastService.showError(r)}handleUserExistsError(r){const o=this.email?.value;o&&!this.duplicateEmails.includes(o)&&(this.duplicateEmails.push(o),this.email?.setErrors({taken:!0})),this.toastService.showError(r)}handleFormDataRequired(r){this.name?.setErrors({taken:!0}),this.email?.setErrors({taken:!0}),this.password?.setErrors({taken:!0}),this.toastService.showError(r)}static#e=this.\u0275fac=function(o){return new(o||t)(e.Y36(n.qu),e.Y36(u.F0),e.Y36(C),e.Y36(Z.k))};static#t=this.\u0275cmp=e.Xpm({type:t,selectors:[["app-reg-page"]],decls:37,vars:13,consts:[[1,"container"],["ngClass","reg"],["ngClass","reg__title"],[1,"reg__form",3,"formGroup","ngSubmit"],["hideRequiredMarker","","appearance","outline",1,"reg__form-width"],["formControlName","name","type","text","id","name","matInput","","placeholder","Your Name","required",""],[4,"ngIf"],["formControlName","email","type","email","id","email","matInput","","placeholder","Your e-mail"],["formControlName","password","matInput","","placeholder","Your password","type","password","id","password"],[1,"reg__form-button-container"],["mat-raised-button","","color","primary",1,"reg__form-button",3,"disabled","click"],["mat-button","","routerLink","/auth/signin"]],template:function(o,a){1&o&&(e.TgZ(0,"div",0)(1,"mat-card",1)(2,"mat-card-title",2),e._uU(3,"Registration"),e.qZA(),e.TgZ(4,"form",3),e.NdJ("ngSubmit",function(){return a.register()}),e.TgZ(5,"mat-form-field",4)(6,"mat-label"),e._uU(7,"Name"),e.qZA(),e._UZ(8,"input",5),e.YNc(9,T,2,0,"mat-error",6),e.YNc(10,b,2,0,"mat-error",6),e.YNc(11,A,2,0,"mat-error",6),e.qZA(),e.TgZ(12,"mat-form-field",4)(13,"mat-label"),e._uU(14,"Email"),e.qZA(),e._UZ(15,"input",7),e.YNc(16,S,2,0,"mat-error",6),e.YNc(17,F,2,0,"mat-error",6),e.YNc(18,U,2,0,"mat-error",6),e.qZA(),e.TgZ(19,"mat-form-field",4)(20,"mat-label"),e._uU(21,"Password"),e.qZA(),e._UZ(22,"input",8),e.TgZ(23,"mat-hint"),e._uU(24,"Min 8 character"),e.qZA(),e.YNc(25,I,2,0,"mat-error",6),e.YNc(26,y,2,0,"mat-error",6),e.YNc(27,q,2,0,"mat-error",6),e.YNc(28,k,2,0,"mat-error",6),e.YNc(29,N,2,0,"mat-error",6),e.qZA(),e.TgZ(30,"div",9)(31,"button",10),e.NdJ("click",function(){return a.register()}),e._uU(32," Submit "),e.qZA()()(),e.TgZ(33,"p"),e._uU(34,"Already have an account click on"),e.TgZ(35,"a",11),e._uU(36,"Sign-In"),e.qZA()()()()),2&o&&(e.xp6(4),e.Q6J("formGroup",a.regForm),e.xp6(5),e.Q6J("ngIf",null==a.name?null:a.name.hasError("required")),e.xp6(1),e.Q6J("ngIf",null==a.name?null:a.name.hasError("maxlength")),e.xp6(1),e.Q6J("ngIf",null==a.name?null:a.name.hasError("pattern")),e.xp6(5),e.Q6J("ngIf",null==a.email?null:a.email.hasError("required")),e.xp6(1),e.Q6J("ngIf",null==a.email?null:a.email.hasError("email")),e.xp6(1),e.Q6J("ngIf",null==a.email?null:a.email.hasError("taken")),e.xp6(7),e.Q6J("ngIf",null==a.password?null:a.password.hasError("required")),e.xp6(1),e.Q6J("ngIf",null==a.password?null:a.password.hasError("minlength")),e.xp6(1),e.Q6J("ngIf",null==a.password?null:a.password.hasError("hasDigit")),e.xp6(1),e.Q6J("ngIf",null==a.password?null:a.password.hasError("hasUpperCase")),e.xp6(1),e.Q6J("ngIf",null==a.password?null:a.password.hasError("hasSpecialChar")),e.xp6(2),e.Q6J("disabled",a.regForm.invalid||a.isSubmitting))},dependencies:[g.mk,g.O5,u.rH,h.zs,h.lW,v.Nt,m.KE,m.hX,m.bx,m.TO,c.a8,c.n5,n._Y,n.Fj,n.JJ,n.JL,n.Q7,n.sg,n.u],styles:[".container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100vh}.reg[_ngcontent-%COMP%]{padding:2rem}.reg__title[_ngcontent-%COMP%]{margin-bottom:1rem}.reg__form[_ngcontent-%COMP%]{min-width:150px;max-width:500px;width:100%}.reg__form-width[_ngcontent-%COMP%]{width:100%}.reg__form-button[_ngcontent-%COMP%]{margin-top:2rem}.reg__form-button-container[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:flex-end}"]})}return t})();var Y=l(1350);function D(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Please enter a e-mail!"),e.qZA())}function x(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Please enter a valid email!"),e.qZA())}function O(t,i){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Please enter a password!"),e.qZA())}const Q=[{path:"",redirectTo:"signin",pathMatch:"full"},{path:"signup",component:R},{path:"signin",component:(()=>{class t{constructor(r,o,a,s){this.fb=r,this.router=o,this.logService=a,this.toastService=s,this.isSubmitting=!1,this.logForm=this.fb.group({email:["",[n.kI.required,n.kI.email]],password:["",[n.kI.required]]})}get email(){return this.logForm.get("email")}get password(){return this.logForm.get("password")}login(){if(this.logForm.invalid)return;this.isSubmitting=!0;const r=this.prepareLogData();this.logService.logUser(r).subscribe({next:o=>{this.router.navigate(["/"]),this.handleAuthSuccess(o)},error:o=>{this.handleAuthError(o)}})}prepareLogData(){const{email:r,password:o}=this.logForm.value;return{email:r??"",password:o??""}}handleAuthSuccess(r){this.isSubmitting=!1,localStorage.setItem("userData",JSON.stringify(this.prepareAuthData(r))),this.toastService.showSuccess("Authentication successful!"),this.logForm.reset()}prepareAuthData(r){const{token:o,uid:a}=r;return{token:o,uid:a,email:this.logForm.value?this.logForm.value.email:""}}handleAuthError(r){switch(this.isSubmitting=!1,r.error.type){case"InvalidFormDataException":this.handleInvalidFormDataError(r.error.message);break;case"NotFoundException":this.handleNotFoundException(r.error.message);break;default:this.toastService.showError("An error occurred. Please try again.")}}handleInvalidFormDataError(r){r.includes("Parameters")?this.handleFormDataRequired(r):this.toastService.showError(r)}handleFormDataRequired(r){this.email?.setErrors({taken:!0}),this.password?.setErrors({taken:!0}),this.toastService.showError(r)}handleNotFoundException(r){this.email?.setErrors({taken:!0}),this.password?.setErrors({taken:!0}),this.toastService.showError(r)}static#e=this.\u0275fac=function(o){return new(o||t)(e.Y36(n.qu),e.Y36(u.F0),e.Y36(Y.$),e.Y36(Z.k))};static#t=this.\u0275cmp=e.Xpm({type:t,selectors:[["app-login-page"]],decls:23,vars:5,consts:[[1,"container"],["ngClass","log"],["ngClass","log__title"],[1,"log__form",3,"formGroup","ngSubmit"],["hideRequiredMarker","","appearance","outline",1,"log__form-width"],["formControlName","email","matInput","","placeholder","Your e-mail","type","text","id","name"],[4,"ngIf"],["formControlName","password","matInput","","placeholder","Your password","type","password","id","password"],[1,"log__form-button-container"],["mat-raised-button","","color","primary",1,"log__form-button",3,"disabled","click"],["mat-button","","routerLink","/auth/signup"]],template:function(o,a){1&o&&(e.TgZ(0,"div",0)(1,"mat-card",1)(2,"mat-card-title",2),e._uU(3,"Authentication"),e.qZA(),e.TgZ(4,"form",3),e.NdJ("ngSubmit",function(){return a.login()}),e.TgZ(5,"mat-form-field",4)(6,"mat-label"),e._uU(7,"Email"),e.qZA(),e._UZ(8,"input",5),e.YNc(9,D,2,0,"mat-error",6),e.YNc(10,x,2,0,"mat-error",6),e.qZA(),e.TgZ(11,"mat-form-field",4)(12,"mat-label"),e._uU(13,"Password"),e.qZA(),e._UZ(14,"input",7),e.YNc(15,O,2,0,"mat-error",6),e.qZA(),e.TgZ(16,"div",8)(17,"button",9),e.NdJ("click",function(){return a.login()}),e._uU(18," Submit "),e.qZA()()(),e.TgZ(19,"p"),e._uU(20,"Don't have an account? "),e.TgZ(21,"a",10),e._uU(22,"Sign-Up"),e.qZA()()()()),2&o&&(e.xp6(4),e.Q6J("formGroup",a.logForm),e.xp6(5),e.Q6J("ngIf",null==a.email?null:a.email.hasError("required")),e.xp6(1),e.Q6J("ngIf",null==a.email?null:a.email.hasError("email")),e.xp6(5),e.Q6J("ngIf",null==a.password?null:a.password.hasError("required")),e.xp6(2),e.Q6J("disabled",a.logForm.invalid||a.isSubmitting))},dependencies:[g.mk,g.O5,u.rH,h.zs,h.lW,v.Nt,m.KE,m.hX,m.TO,c.a8,c.n5,n._Y,n.Fj,n.JJ,n.JL,n.sg,n.u],styles:[".container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100vh}.log[_ngcontent-%COMP%]{padding:2rem}.log__title[_ngcontent-%COMP%]{margin-bottom:1rem}.log__form[_ngcontent-%COMP%]{min-width:150px;max-width:500px;width:100%}.log__form-width[_ngcontent-%COMP%]{width:100%}.log__form-button[_ngcontent-%COMP%]{margin-top:2rem}.log__form-button-container[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:flex-end}"]})}return t})()}];let L=(()=>{class t{static#e=this.\u0275fac=function(o){return new(o||t)};static#t=this.\u0275mod=e.oAB({type:t});static#r=this.\u0275inj=e.cJS({imports:[u.Bz.forChild(Q),u.Bz]})}return t})(),M=(()=>{class t{static#e=this.\u0275fac=function(o){return new(o||t)};static#t=this.\u0275mod=e.oAB({type:t});static#r=this.\u0275inj=e.cJS({imports:[g.ez,L,w.m]})}return t})()}}]);