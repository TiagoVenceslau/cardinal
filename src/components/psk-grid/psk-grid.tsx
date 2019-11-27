import { Component, Prop, h, Element } from '@stencil/core';
import { TableOfContentProperty } from '../../decorators/TableOfContentProperty';

@Component({
    tag: "psk-grid",
    styleUrl: './psk-grid.css'
})
export class PskGrid {
    @TableOfContentProperty({
        isMandatory: false,
        propertyType: 'number',
        description: 'This is the number of columns for the bootstrap columns class.',
        defaultValue: 'null',
        specialNote: `That number can only be a natural one between 1 and 12`
    })
    @Prop() columns: number | null;

    @Element() host: HTMLElement;

    render() {
        if (!this.columns) {
            return;
        }

        let className = `col-12 col-md-${Math.floor(12 / this.columns)}`;
        let index = 0;
        while (index < this.host.children.length) {
            this.host.children.item(index++).className = className;
        }

        return <div class="row">
            <slot />
        </div>;
    }
}