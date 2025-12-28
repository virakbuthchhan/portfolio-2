'use client'
import React from "react";
import {Controller, useForm} from "react-hook-form";

import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

type FormValues = {
    phone: string;
    fullName: string;
    position: string;
    gender: string;
    confirmAttend: boolean;
};

const FormAttendee = () => {
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<FormValues>({
        defaultValues: {
            phone: "",
            fullName: "",
            position: "",
            gender: "",
            confirmAttend: false,
        },
    });

    const onSubmit = (data: FormValues) => {
        console.log(data);
        // TODO: replace with real submit logic
    };

    const selectClass =
        "bg-muted h-10 w-full rounded-xl border-none shadow-none ring-0 px-3 text-sm focus-visible:outline-none focus-visible:ring-0 active:outline-0 active:ring-0";

    return (
        <section className="flex w-screen items-center justify-center overflow-hidden py-32">
            <div className="container flex w-full flex-col items-center justify-center px-4 md:h-full">
                <p className="text-md text-muted-foreground mx-auto max-w-xl text-center lg:text-lg font-bold">
                    វគ្គបណ្ដុះបណ្ដាលស្ដីពីការតាក់តែលិខិតរដ្ឋបាល
                </p>
                <p className="text-md text-muted-foreground mx-auto max-w-xl text-center lg:text-lg">
                    ថ្ងៃទី ២៣ ខែតុលា ឆ្នាំ២០២៥
                </p>

                <form onSubmit={handleSubmit(onSubmit)}
                      className="relative z-20 mt-8 w-full max-w-md rounded-xl bg-transparent p-4">
                    <div className="mb-3">
                        <label className="mb-1 block text-sm font-medium">លេខទូរសព្ទ <span
                            className="text-red-700">*</span></label>
                        <Controller
                            name="phone"
                            control={control}
                            rules={{required: "Phone number is required"}}
                            render={({field}) => (
                                <Input
                                    {...field}
                                    placeholder="+1 555 555 5555"
                                    className="bg-muted h-10 w-full rounded-xl border-none shadow-none ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-0 active:ring-0"
                                    inputMode="tel"
                                />
                            )}
                        />
                        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label className="mb-1 block text-sm font-medium">ឈ្មោះពេញ <span
                            className="text-red-700">*</span></label>
                        <Controller
                            name="fullName"
                            control={control}
                            rules={{required: "Full name is required"}}
                            render={({field}) => (
                                <Input
                                    {...field}
                                    placeholder="John Doe"
                                    className="bg-muted h-10 w-full rounded-xl border-none shadow-none ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-0 active:ring-0"
                                />
                            )}
                        />
                        {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label className="mb-1 block text-sm font-medium">តួនាទី <span className="text-red-700">*</span></label>
                        <select
                            {...register("position", {required: "Position is required"})}
                            value={undefined}
                            className={selectClass}
                            aria-label="Position"
                        >
                            <option value="">Select position</option>
                            <option value="manager">Manager</option>
                            <option value="developer">Developer</option>
                            <option value="designer">Designer</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.position && <p className="mt-1 text-xs text-red-600">{errors.position.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label className="mb-1 block text-sm font-medium">ភេទ <span
                            className="text-red-700">*</span></label>
                        <select
                            {...register("gender", {required: "Gender is required"})}
                            value={undefined}
                            className={selectClass}
                            aria-label="Gender"
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer_not">Prefer not to say</option>
                        </select>
                        {errors.gender && <p className="mt-1 text-xs text-red-600">{errors.gender.message}</p>}
                    </div>

                    <div className="mb-4 flex items-center gap-2">
                        <input
                            id="confirmAttend"
                            type="checkbox"
                            {...register("confirmAttend", {required: "Please confirm attendance"})}
                            className="h-4 w-4 rounded border-muted bg-background text-primary focus:ring-0"
                        />
                        <label htmlFor="confirmAttend" className="text-sm">
                            ខ្ញុំបានចូលរួមពិតប្រាកដ <span className="text-red-700">*</span>
                        </label>
                    </div>
                    {errors.confirmAttend &&
                        <p className="mt-1 text-xs text-red-600">{errors.confirmAttend.message}</p>}

                    <div className="flex items-center justify-between gap-3">
                        <Button type="submit" className="h-10 rounded-xl">
                            រួចរាល់
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            className="h-10 rounded-xl"
                            onClick={() => reset()}
                        >
                            សម្អាត
                        </Button>
                    </div>
                </form>

                <div className="mt-10 flex items-center gap-2">
                                      <span className="inline-flex items-center -space-x-2.5">
                                        {Array.from({length: 6}).map((_, index) => (
                                            <Avatar key={index} className="size-8">
                                                <AvatarImage
                                                    src={`https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/avatar${index + 1}.png`}
                                                    alt="placeholder"
                                                />
                                            </Avatar>
                                        ))}
                                      </span>
                    <p className="text-muted-foreground/80 tracking-tight">20នាក់ បានចូលរួម</p>
                </div>
            </div>
        </section>
    );
};

export {FormAttendee};
