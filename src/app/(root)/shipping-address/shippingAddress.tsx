"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form";
import { shippingAddressSchema } from "@/lib/validator";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { updateUserAddress } from "@/lib/productAction.tsx/user.action";
import { toast } from "sonner";
export const ShippingAddress = ({ address }: { address: any }) => {
  console.log("Address:   "+address?.fullName);
  const Router = useRouter();

  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    mode: "onChange",
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      fullName: address?.fullName ?? "",
      streetAddress: address?.streetAddress ?? "",
      city: address?.city ?? "",
      postalCode: address?.postalCode ?? "",
      country: address?.country ?? "",
      lat: address?.lat,
      lng: address?.lng,
    },
  });
  const [pending, startTransition] = React.useTransition();

  const onsubmit: SubmitHandler<z.infer<typeof shippingAddressSchema>> = async (
    values
  ) => {
    startTransition(async () => {
      const res = await updateUserAddress(values);

      if (!res.success) {
        toast("updating address in not Successfull", {
          description: `${res.message}`,
        });
        return;
      }

      Router.push("/payment-method");
    });
  };

  return (
    <div className="max-w-md mx-auto ">
      <h1 className="font-bold text-3xl mt-4 mb-3">Shipping Address</h1>

      <Form {...form}>
        <form
          method="post"
          onSubmit={form.handleSubmit(onsubmit)}
          className="flex flex-col gap-y-3"
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof shippingAddressSchema>,
                "fullName"
              >;
            }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="streetAddress"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof shippingAddressSchema>,
                "streetAddress"
              >;
            }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter streetAddress" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof shippingAddressSchema>,
                "city"
              >;
            }) => (
              <FormItem>
                <FormLabel>city</FormLabel>
                <FormControl>
                  <Input placeholder="Enter city" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postalCode"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof shippingAddressSchema>,
                "postalCode"
              >;
            }) => (
              <FormItem>
                <FormLabel>postalCode</FormLabel>
                <FormControl>
                  <Input placeholder="Enter postalCode" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof shippingAddressSchema>,
                "country"
              >;
            }) => (
              <FormItem>
                <FormLabel>country</FormLabel>
                <FormControl>
                  <Input placeholder="Enter country" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button type="submit" disabled={pending}>
              {pending ? <Loader className="h-3 w-3 animate-spin" /> : "submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
