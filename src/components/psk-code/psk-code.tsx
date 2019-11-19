import { Component, Element, h, State, Prop } from "@stencil/core";
import Prism from 'prismjs';
import { TableOfContentProperty } from "../../decorators/TableOfContentProperty";
import CustomTheme from "../../decorators/CustomTheme";

@Component({
    tag: "psk-code"
})

export class PskCode {
    @CustomTheme()

    @TableOfContentProperty({
        description: `This property is the title of the psk-chapter that will be created.`,
        isMandatory: false,
        propertyType: `string`
    })
    @Prop() title: string = "";

    @TableOfContentProperty({
        description: `This property is the language, in which the code is written(so the css can identify it).`,
        isMandatory: false,
        propertyType: `string`
    })
    @Prop() language: string = '';

    @State() componentCode: string = "";
    @Element() host: HTMLDivElement;

    componentWillLoad() {

      switch (this.language) {
        case "javascript":
        case "css":
          this.componentCode = this.host.innerText;
          break;
        default:
          this.componentCode = this.host.innerHTML;
          let linkElement = this.host.querySelector("link");
          if (linkElement) {
            this.host.innerHTML = linkElement.outerHTML;
            this.componentCode = this.componentCode.replace(linkElement.outerHTML, "");

            linkElement && linkElement.remove();
          }
      }
        this.host.innerHTML = '';
    }

    componentDidLoad() {
        Prism.highlightAllUnder(this.host);
    }

    render() {

        const sourceCode = (
            <pre>
                <code class={`language-${this.language}`}>
                    {this.componentCode}
                </code>
            </pre>
        );

        if (this.title.replace(/\s/g, '') === '') {
            return <div>{sourceCode}</div>;
        }

        return <psk-chapter title={this.title}>{sourceCode}</psk-chapter>;
    }
}
