import { SettingsService } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { SocialService, SocialOpenType, ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
import {LoginParam, PassportService} from '../passport.service';
import {Result} from '@core/net/Result.entity';

@Component({
    selector: 'passport-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.less' ],
    providers: [ SocialService ]
})
export class UserLoginComponent implements OnDestroy {

    form: FormGroup;
    error = '';
    type = 0;
    loading = false;

    constructor(
        fb: FormBuilder,
        private router: Router,
        public msg: NzMessageService,
        private settingsService: SettingsService,
        private socialService: SocialService,
        @Optional() @Inject(ReuseTabService) private reuseTabService: ReuseTabService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
        private passportService: PassportService) {
        this.form = fb.group({
            userName: [null, [Validators.required, Validators.minLength(5)]],
            password: [null, Validators.required],
            mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
            captcha: [null, [Validators.required]],
            remember: [true]
        });
    }

    // region: fields

    get userName() { return this.form.controls['userName']; }
    get password() { return this.form.controls['password']; }
    get mobile() { return this.form.controls['mobile']; }
    get captcha() { return this.form.controls['captcha']; }

    // endregion

    switch(ret: any) {
        this.type = ret.index;
    }

    // region: get captcha

    count = 0;
    interval$: any;

    getCaptcha() {
        this.count = 59;
        this.interval$ = setInterval(() => {
            this.count -= 1;
            if (this.count <= 0)
                clearInterval(this.interval$);
        }, 1000);
    }

    // endregion

    submit() {
        this.error = '';
        let param;
        if (this.type === 0) {
            this.userName.markAsDirty();
            this.password.markAsDirty();
            if (this.userName.invalid || this.password.invalid) return;
            param = new LoginParam(this.userName.value, this.password.value);
        } else {
            this.mobile.markAsDirty();
            this.captcha.markAsDirty();
            if (this.mobile.invalid || this.captcha.invalid) return;
        }
        // mock http
        this.loading = true;
        this.passportService.login(param).subscribe(
            (data: Result) => {
                if (data.code !== 0) {
                    this.msg.error(data.msg);
                    this.loading = false;
                    return;
                }
                // 清空路由复用信息
                this.reuseTabService.clear();
                this.tokenService.set({
                    token: '123456789',
                    name: this.userName.value,
                    email: `cipchk@qq.com`,
                    id: 10000,
                    time: +new Date
                });
                this.router.navigate(['/']);
            }

        );
        // setTimeout(() => {
        //     this.loading = false;
        //     if (this.type === 0) {
        //         if (this.userName.value !== 'admin' || this.password.value !== '888888') {
        //             this.error = `账户或密码错误`;
        //             return;
        //         }
        //     }
        //
        //
        // }, 1000);
    }

    // region: social

    open(type: string, openType: SocialOpenType = 'href') {
        let url = ``;
        let callback = ``;
        if (environment.production)
            callback = 'https://cipchk.github.io/ng-alain/callback/' + type;
        else
            callback = 'http://localhost:4200/callback/' + type;
        switch (type) {
            case 'auth0':
                url = `//cipchk.auth0.com/login?client=8gcNydIDzGBYxzqV0Vm1CX_RXH-wsWo5&redirect_uri=${decodeURIComponent(callback)}`;
                break;
            case 'github':
                url = `//github.com/login/oauth/authorize?client_id=9d6baae4b04a23fcafa2&response_type=code&redirect_uri=${decodeURIComponent(callback)}`;
                break;
            case 'weibo':
                url = `https://api.weibo.com/oauth2/authorize?client_id=1239507802&response_type=code&redirect_uri=${decodeURIComponent(callback)}`;
                break;
        }
        if (openType === 'window') {
            this.socialService.login(url, '/', {
                type: 'window'
            }).subscribe(res => {
                if (res) {
                    this.settingsService.setUser(res);
                    this.router.navigateByUrl('/');
                }
            });
        } else {
            this.socialService.login(url, '/', {
                type: 'href'
            });
        }
    }

    // endregion

    ngOnDestroy(): void {
        if (this.interval$) clearInterval(this.interval$);
    }
}
