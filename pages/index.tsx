
import { Inter } from "next/font/google";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button";

import { signIn } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

type Inputs = {
  email: string
  password: string
}
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, {
    message: "password must be between 4 - 20 characters.",
  }).max(20, {
    message: "password must be between 4 - 20 characters.",
  }),
})

export default function Home() {
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<Inputs> =  async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    
  }
  return (
    <>
      <main
        className={`*:non-selectable login-wrapper relative z-0 flex min-h-screen flex-col items-center justify-between ${inter.className} z-0`}
      >
        <div className="container border-2 border-black border-dashed rounded-lg px-3 py-10 m-auto max-w-xs">
          <div className="form-wrapper p-3 rounded-lg ">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-center">
                <FormField
                  control={form.control}
                  name="email"

                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input placeholder="Email Address" type="email" {...field} autoComplete="false" autoFocus />
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
            <hr className="my-5" />
            <div className="grid place-content-center">
              <Button className="mx-auto" asChild>
                <Link href={'/register'}>
                  Register
                </Link>
              </Button>
              </div>
          </div>
        </div>
        <div className="container relative border-2 border-black border-dashed rounded-lg px-3 py-6 flex justify-center m-auto max-w-xs">
          <Button onClick={() => signIn('google', {callbackUrl: '/dashboard'})}>  Sign In With Google</Button>
          <h1 className="absolute -top-3 bg-white px-1 font-bold text-xl">OR</h1>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions)
  
  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    }
  }
  return {
    props: {
      session
    }
  }
 
}