import { Component, h, Prop } from '@stencil/core';
import { WizardStep } from '../../interfaces/Wizard';

@Component({
    tag: 'psk-stepper-renderer',
    styleUrl: "./psk-stepper-renderer.css",
    shadow: true
})
export class PskStepperRenderer {

    @Prop() wizardSteps: WizardStep[];
    @Prop() activeStep: WizardStep;
    @Prop() handleStepChange: Function;

    computeStepDesign(stepIndex: number, activeStepIndex: number, lastStepIndex: number): string {
        let stepClass: string = "";

        if (stepIndex === 0) {
            stepClass += "first ";
        } else if (stepIndex === lastStepIndex) {
            stepClass += "last ";
        }

        if (stepIndex < activeStepIndex) {
            stepClass += "done";
        } else if (stepIndex === activeStepIndex) {
            stepClass += "current";
        }

        return stepClass;
    }

    render() {

        return (
            <div class="steps clearfix">
                <ul role="tablist">
                    {this.wizardSteps.map((step: WizardStep) => (
                        <li role="tab" class={this.computeStepDesign(step.stepIndex, this.activeStep.stepIndex, this.wizardSteps.length - 1)}>
                            <div class="button" onClick={(ev) => {
                                ev.preventDefault();
                                ev.stopImmediatePropagation()
                                this.handleStepChange(step.stepIndex);
                            }}>
                                <span class="current-info audible"></span>
                                <div class="title">
                                    <p class="step-icon"><span>{step.stepIndex + 1}</span></p>
                                    <div class="step-text">
                                        <span class="step-inner">{step.stepName}</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}