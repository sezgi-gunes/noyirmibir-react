import React, { ReactElement, useContext, useEffect } from 'react';
import { FormContext } from '..';
import { Prevention, preventKey } from '../models/preventions';
import { validateFormItem, Validation, ValidationType } from '../models/validations';
import ErrorMessage from './errorMessage';

type InputPasswordProps = {
    name: string,
    value?: string,
    isDisabled?: boolean,
    label?: string,
    placeholder?: string,
    isValid?: boolean,
    rules?: Array<Validation>,
    prevention?: Prevention,
    mask?: string | (string | RegExp)[],
    classNames?: string,
    changeFunction?: Function,
    children?: ReactElement
}

const InputPassword = (props: InputPasswordProps) => {
    const context = useContext(FormContext);

    useEffect(() => {
        if (context.model.items.some(x => x.name === props.name)) {
            throw new Error("Development error ---> Each form element must have unique name!");
        }

        context.model.items.push({
            name: props.name,
            value: props.value??"",
            rules: props.rules,
            isValid: (props.rules ? props.isValid : true)
        });

        context.setModel({...context.model});

        return () => {
            context.model.items = context.model.items.filter(x => x.name !== props.name);

            context.setModel({...context.model});
        }
    }, []);

    const handleChange = (value: string) => {
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
            {props.label &&
                <label>{props.label}</label>
            }
            <input
                type="password"
                name={props.name}
                defaultValue={props.value}
                onKeyPress={(e) => preventKey(e, props.prevention)}
                onChange={(e) => { handleChange(e.target.value) }}
                {...(props.isDisabled ? {disabled: true} : {})}
            />
            {props.children}
            <ErrorMessage rules={props.rules} />
        </div>
    )
}

export default InputPassword;