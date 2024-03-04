'use client';


import React, {KeyboardEventHandler, useRef} from 'react';
import CreatableSelect from 'react-select/creatable';


const components = {
    DropdownIndicator: null,
};


const createOption = (label: string) => ({
    label,
    value: label,
});
interface Option {
    readonly label: string;
    readonly value: string;
}
interface ICreatableInput {
    value:readonly Option[],
    setValue: React.Dispatch<React.SetStateAction<readonly Option[]>>
}
export function CreatableInput ({value, setValue}:ICreatableInput) {
    const [inputValue, setInputValue] = React.useState('');


    const handleKeyDown: KeyboardEventHandler = (event) => {
        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                const isExist = value.find((item) => item.value === inputValue)
                if(isExist) return
                setValue((prev) => [...prev, createOption(inputValue)]);
                setInputValue('');

                event.preventDefault();
        }
    };

    return (
        <>

            <CreatableSelect
                components={components}
                inputValue={inputValue}
                isClearable
                isMulti
                menuIsOpen={false}
                onChange={(newValue) => setValue(newValue)}
                onInputChange={(newValue) => setInputValue(newValue)}
                onKeyDown={handleKeyDown}
                placeholder="Type something and press enter..."
                value={value}
                autoFocus={true}
            />
        </>
    )
}