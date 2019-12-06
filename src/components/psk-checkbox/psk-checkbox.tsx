import { h, Component, Prop, Element } from '@stencil/core';

@Component({
    tag: 'psk-checkbox'
})
export class PskCheckbox {

    @Prop() label?: string | null = null;
    @Prop() checkboxLabel?: string | null = null;

    @Prop() required?: boolean = false;
    @Prop() checked?: boolean = false;

    render() {
        return (
            <div class="form-group">
                {this.label && <label
                    class="form-check-label"
                    htmlFor={this.label.replace(/\s/g, '').toLowerCase()}>
                    {this.label}
                </label>}

                <div class="form-check">
                    <input
                        type="checkbox"
                        id={this.checkboxLabel && this.checkboxLabel.replace(/\s/g, '').toLowerCase()}
                        checked={this.checked}
                        name={this.checkboxLabel && this.checkboxLabel.replace(/\s/g, '').toLowerCase()}
                        class={`form-check-input`} />

                    {this.checkboxLabel && <label
                        class="form-check-label"
                        htmlFor={this.checkboxLabel.replace(/\s/g, '').toLowerCase()}>
                        {this.checkboxLabel}
                    </label>}
                </div>
            </div>
        );
    }

    @Element() private __host: HTMLElement;

    componentDidRender() {
        const input: HTMLInputElement = this.__host.querySelector('input');

        if (this.required) {
            input.setAttribute('required', 'required');
        }
    }
}