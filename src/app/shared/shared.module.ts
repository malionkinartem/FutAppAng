import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../user/login/login.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleModalComponent, ModalTriggerDirective, EqualValidatorDirective } from '../common/index';
import { JsonHttpService } from './index'
import { HttpModule } from '@angular/http'

@NgModule({
    declarations: [
        LoginComponent,
        SimpleModalComponent,
        ModalTriggerDirective,
        EqualValidatorDirective
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpModule        
    ],
    providers: [
        JsonHttpService
    ],
    exports: [
        LoginComponent,
        SimpleModalComponent,
        ModalTriggerDirective,
        EqualValidatorDirective
    ]
})

export class SharedModule { }
