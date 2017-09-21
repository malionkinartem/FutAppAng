import { Directive, OnInit, Inject, ElementRef, Input, Attribute } from '@angular/core'
import * as $ from 'jquery'

@Directive({
    selector: '[futModalTrigger]'
})

export class ModalTriggerDirective implements OnInit {
    private el: HTMLElement

    constructor( el: ElementRef, @Attribute('futModalTrigger') public modalId: string) {
        this.el = el.nativeElement
    }

    ngOnInit() {
        this.el.addEventListener('click', e => {
            $(`#${this.modalId}`).toggle();
        })
    }
}
