import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appTextCount]"
})
export class TextCountDirective {
  constructor(private _el: ElementRef, private _renderer: Renderer2) {}
  text;
  formGroup: any;
  ngOnInit() {
    this.formGroup = this._el.nativeElement.closest(".input-field");
    let divElement = this._renderer.createElement("small");
    let text = this._renderer.createText(
      String(this._el.nativeElement.value.length + "/" + this._el.nativeElement.maxLength));
    this._renderer.addClass(divElement, "text-right");
    this._renderer.addClass(divElement, "text-muted");
    this._renderer.addClass(divElement, "show-remaining-count");
    this._renderer.appendChild(divElement, text);
    this._renderer.appendChild(this.formGroup, divElement);
  }
  @HostListener("ngModelChange", ["$event"]) onKeyUp(value) {
    let leftChars =
      this._el.nativeElement.maxLength - this._el.nativeElement.value.length;
    this.formGroup.querySelectorAll("small")[0].innerHTML =
      String(this._el.nativeElement.value.length +"/" + this._el.nativeElement.maxLength);
  }
}


//String(this. el.nativeElement.value.length+"/"+leftChars) + characters[leftChars > 1 ? "s":""}