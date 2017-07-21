import { Directive, OnInit, Inject, ElementRef, Input } from '@angular/core'
import * as $ from 'jquery'

@Directive({
    selector: '[modal-trigger]'
})

export class ModalTriggerDirective implements OnInit {
    @Input('modal-trigger') modalId: string

    private el: HTMLElement

    constructor( el: ElementRef) {
        this.el = el.nativeElement
    }

    ngOnInit() {
        this.el.addEventListener('click', e => {
            $(`#${this.modalId}`).toggle();
        })
    }
}