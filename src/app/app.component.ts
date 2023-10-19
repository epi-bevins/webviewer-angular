import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from "@angular/core";
import WebViewer from "@pdftron/webviewer";

@Component({
  selector: "app-root",
  styleUrls: ["app.component.css"],
  templateUrl: "app.component.html",
})
export class AppComponent implements AfterViewInit {
  @ViewChild("viewer") viewer!: ElementRef;
  fileName: string = '';

  async ngOnInit() {
    const urlParams = new URLSearchParams(window.location.search);
    this.fileName = urlParams.get('file') || '';
  }

  ngAfterViewInit(): void {
    this.loadDocument();
  }

  async loadDocument() {
    WebViewer(
      {
        path: "../lib",
        initialDoc: "http://localhost:3000/file/" + this.fileName,
        fullAPI: true,
        licenseKey: "demo:1697228693784:7ce6fb280300000000955144a7ddff50897c58ac2e3362bb24286f406d", // sign up to get a free trial key at https://dev.apryse.com
      },
      this.viewer.nativeElement
    ).then((instance) => {
      instance.UI.setTheme('dark');
      instance.UI.disableElements(['header']);
    });
  }
}
