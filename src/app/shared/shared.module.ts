import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../user/login/login.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleModalComponent, ModalTriggerDirective, EqualValidatorDirective } from '../common/index';

@NgModule({
    declarations: [
        LoginComponent,
        SimpleModalComponent,
        ModalTriggerDirective,
        EqualValidatorDirective
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    providers: [

    ],
    exports: [
        LoginComponent,
        SimpleModalComponent,
        ModalTriggerDirective,
        EqualValidatorDirective
    ]
})

export class SharedModule { }
