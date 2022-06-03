import React, { ReactElement, useContext, useEffect } from 'react';
import { FormContext } from '..';
import { validateFormItem, Validation, ValidationType } from '../models/validations';
import ErrorMessage from './errorMessage';

type CheckboxProps = {
    name: string,
    value?: string,
    checked?: boolean,
    label?: string,
    isValid?: boolean,
    rules?: Array<Validation>,
    isDisabled?: boolean,
    classNames?: string,
    changeFunction?: Function,
    children?: ReactElement
}

const Checkbox = (props: CheckboxProps) => {
    const context = useContext(FormContext);

    useEffect(() => {
        if (context.model.items.some(x => x.name === props.name)) {
            throw new Error("Development error ---> Each form element must have unique name!");
        }

        context.model.items.push({
            name: props.name,
            value: props.checked ? props.value??"" : "",
            rules: props.rules,
            isValid: (props.rules ? props.isValid : true)
        });

        context.setModel({...context.model});

        return () => {
            context.model.items = context.model.items.filter(x => x.name !== props.name);

            context.setModel({...context.model});
        }
    }, []);

    const handleChange = (value: any) => {
        const item = context.model.items.find(x => x.name === props.name);
        let sameWithValue = context.model.items.find(x => x.name === props.rules?.find(x => x.type === ValidationType.SameWith)?.value)?.value;

        if (item) {
            item.value = value;
            item.isValid = validateFormItem(value, props.rules, sameWithValue);

            context.setModel({...context.model});
        }

        if (props.changeFunction) {
            props.changeFunction(value);
        }
    }

    return (
        <div className={"form-item" + ((props.value??"".toString()).length > 0 ? " filled" : "") + (props.isValid === false ? " has-error" : "") + (props.classNames ? " " + props.classNames : "")}>
            <input
                type="checkbox"
                id={props.name}
                name={props.name}
                defaultValue={props.value}
                onChange={(e) => { handleChange(e.target.checked ? e.target.value : "") }}
                checked={props.checked}
                {...(props.isDisabled ? { disabled: true } : {})}
            />
            <label htmlFor={props.name}>{props.label}</label>
            <ErrorMessage rules={props.rules} />
        </div>
    )
}

export default Checkbox;