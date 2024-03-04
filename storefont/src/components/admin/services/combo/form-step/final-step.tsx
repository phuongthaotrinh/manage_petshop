"use client";

import FormWrapper from "./form-wrapper";
import * as React from "react";
import {FormItems} from "@/components/forms/service-combo-form";


type StepProps = FormItems & {
    goTo: (index: number) => void
};

const FinalStep = ({ goTo}: StepProps) => {
    return (
        <FormWrapper
            title="Finishing Up"
            description="Double-check everything looks OK before confirming."
        >

            FISDSDDD
        </FormWrapper>
    );
};

export {FinalStep};