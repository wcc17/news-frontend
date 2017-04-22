import { Component, Input, ElementRef, OnInit, Renderer } from '@angular/core';

@Component({
    selector: 'app-disqus',
    templateUrl: './disqus.component.html',
    styleUrls: ['./disqus.component.css']
})
export class DisqusComponent implements OnInit {
    public shortname: string = '***REMOVED***'; //lol. change to whatever disqus shortname, set this one up as a test account
    @Input() identifier: number;

    constructor(private el:ElementRef, private renderer:Renderer) { }

    ngOnInit() {
    }

    ngOnChanges() {
      if ((<any>window).DISQUS === undefined) {
        this.addScriptTag();
      }
      else {
        this.reset();
      }
    }

    /**
     * Reset Disqus with new information.
     */
    reset() {
      (<any>window).DISQUS.reset({
        reload: true,
        config: this.getConfig()
      });
    }

    /**
     * Add the Disqus script to the document.
     */
    addScriptTag() {
       (<any>window).disqus_config = this.getConfig();

       let script = this.renderer.createElement(this.el.nativeElement, 'script');
       script.src = `//${this.shortname}.disqus.com/embed.js`;
       script.async = true;
       script.type = 'text/javascript';
       script.setAttribute('data-timestamp', new Date().getTime().toString());
     }

    /**
     * Get Disqus config
     */
    getConfig() {
      let _self = this;
      return function () {
        this.page.url = window.location.href;
        this.page.identifier = _self.identifier.toString();
        this.language = 'en';
      };
    }
}