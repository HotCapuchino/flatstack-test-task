import React from 'react';
import step_styles from '../Steps.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentStep } from '../../../redux/actions/userActions';

function Stepper() {

    const steps = ['Shipping', 'Billing', 'Payment'];
    const currentStep = useSelector(state => {
        return state.userInfo.currentStep;
    });
    const dispatch = useDispatch();

    function handleChangingStep(target_step) {
        target_step = target_step.toLowerCase();
        let target_step_index = steps.findIndex(step => {
            return target_step === step.toLowerCase();
        });
        let currentStepIndex = steps.findIndex(step => {
            return step.toLowerCase() === currentStep.toLowerCase();
        });
        if (target_step_index < currentStepIndex && target_step_index >= 0) {
            dispatch(setCurrentStep(target_step))
        }
    }

    let stepperItems = steps.map((elem) => {
        if (elem.toLowerCase() === currentStep.toLowerCase()) {
            return <div className={`${step_styles.stepperWrapper__activeStep} ${step_styles.stepperWrapper__item}`} 
                        key={elem} onClick={() => handleChangingStep(elem)}>{elem}</div>;
        } else {
            return <div className={`${step_styles.stepperWrapper__inactiveStep} ${step_styles.stepperWrapper__item}`} 
                        key={elem} onClick={() => handleChangingStep(elem)}>{elem}</div>;
        }
    });

    return(
        <div className={step_styles.stepperWrapper}>
            {stepperItems}
        </div>
    )
}

export default Stepper;