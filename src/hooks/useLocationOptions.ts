"use client"
import { useEffect, useMemo } from "react";
import { useWatch, UseFormSetValue, Control, Path } from "react-hook-form";
import { statesByCountry } from "@/lib/data/onboarding/statesByCountry";
import { citiesByState } from "@/lib/data/onboarding/cityByStates";

export function useLocationOptions<T extends Record<string, any>>(
    control: Control<T>,
    setValue: UseFormSetValue<T>
) {
    // 👇 Watch for selected country and state in real-time
    const selectedCountry = useWatch({ control, name: "residenceCountry" as Path<T> });
    const selectedState = useWatch({ control, name: "state" as Path<T> });

    // 👇 Normalize values (handle multiSelect or singleSelect)
    const selectedCountryValue = useMemo(
        () =>
            Array.isArray(selectedCountry)
                ? selectedCountry[0]?.value
                : selectedCountry,
        [selectedCountry]
    );

    const selectedStateValue = useMemo(
        () =>
            Array.isArray(selectedState)
                ? selectedState[0]?.value
                : selectedState,
        [selectedState]
    );

    // 👇 Get state options based on selected country
    const stateOptions = useMemo(() => {
        return selectedCountryValue && statesByCountry[selectedCountryValue]
            ? statesByCountry[selectedCountryValue]
            : [];
    }, [selectedCountryValue]);

    // 👇 Get city options based on selected state
    const cityOptions = useMemo(() => {
        return selectedStateValue && citiesByState[selectedStateValue]
            ? citiesByState[selectedStateValue]
            : [];
    }, [selectedStateValue]);

    // 👇 Reset state + city when country changes
    useEffect(() => {
        setValue("state" as Path<T>, "" as any);
        setValue("city" as Path<T>, "" as any);
    }, [selectedCountryValue, setValue]);

    // 👇 Reset city when state changes
    useEffect(() => {
        setValue("city" as Path<T>, "" as any);
    }, [selectedStateValue, setValue]);

    return {
        selectedCountryValue,
        selectedStateValue,
        stateOptions,
        cityOptions,
    };
}
