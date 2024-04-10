import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import React from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod"

type Props = {}
type Inputs = {
    name: string;
    email: string;
    password: string;
    avatar: string;
}
const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4, {
        message: "password must be between 4 - 20 characters.",
    }).max(20, {
        message: "password must be between 4 - 20 characters.",
    }),
    name: z.string().min(2, {
        message: 'enter atleast 2 characters'
    }).max(20, {
        message: 'you can enter atmax 20 characters'
    }),
})
const Register = (props: Props) => {

    const form = useForm<Inputs>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })
   

    const onSubmit: SubmitHandler<Inputs> = async(values: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const submitValues = {
            ...values, avatar: 'https://picsum.photos/800'
        }
        console.log(submitValues)
        const api = await fetch('https://api.escuelajs.co/api/v1/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(submitValues)
        })
        const res = await api.json()
        console.log({res});
        
    }
    return (
        <div className="container border-2 border-black border-dashed rounded-lg px-3 py-10 m-auto max-w-xs">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-center">
                    <FormField
                        control={form.control}
                        name="name"

                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name" type="text" {...field} autoComplete="false" autoFocus />
                                </FormControl>
                                <FormDescription>
                                    eg: abc@example.com
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"

                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email Address" type="email" {...field} autoComplete="false" />
                                </FormControl>
                                <FormDescription>
                                    eg: abc@example.com
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Password" type="password" {...field} autoComplete="false" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
            <div className="container relative border-2 border-black border-dashed rounded-lg px-3 py-6 flex justify-center m-auto mt-5 max-w-xs">
          <Button onClick={() => signIn('google', {callbackUrl: '/dashboard'})}>  Sign In With Google</Button>
          <h1 className="absolute -top-3 bg-white px-1 font-bold text-xl">OR</h1>
        </div>
        </div>
    )
}

export default Register