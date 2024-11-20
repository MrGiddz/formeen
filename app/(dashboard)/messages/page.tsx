"use client";

import { getAllContact, saveContactDetails } from "@/actions/contact";
import { sendSMS } from "@/actions/send-notification";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatPhoneNumber } from "@/lib/utils";
import { ContactSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, Pen, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type Props = z.infer<typeof ContactSchema>;

const Messages = (props: Props) => {
  const [contacts, setContacts] = useState<Props[] | null>(null);
  const [addNew, setAddnew] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const form = useForm<Props>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  const saveContact = async (values: Props) => {
    setSuccess(undefined);
    setError(undefined);
    const newContacts = contacts ? [...contacts, values] : [values];
    setContacts(newContacts);
    setAddnew(false);
    const res = await saveContactDetails(values);
    if (res.success) {
      setSuccess(res.success);
    } else {
      setError(res.error);
    }
    form.reset();
  };

  const sendMessage = () => {
    if (!message || message.length <= 0) {
      setError("Please enter a valid message");
    }
    setLoading(true);
    if (contacts && contacts.length > 0) {
      Promise.all(
        contacts.map(async (contact) => {
          await sendSMS(message.replace("#name", contact.name), contact.phone);
        })
      ).then(() => {
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    const fetchContacts = async () => {
      const data = await getAllContact();

      setContacts(data.contacts as Props[]);
    };

    fetchContacts();
  }, []);

  return (
    <div className="flex flex-col pt-5">
      <h1 className="text-2xl font-bold my-4 px-4">Send Bulk Messages</h1>

      <div className="grid grid-cols-6 py-4 place-content-start">
        <h4 className="text-lg font-bold px-4 col-span-1">Recipients:</h4>

        <div className="col-span-5">
          <div className="flex justify-start items-center bg-gray-200 rounded-sm">
            <div className="w-12 px-2 ">
              <Checkbox onClick={() => {}} />
            </div>
            <div className="w-full grid grid-cols-2">
              <p className="border-r border-r-gray-600 px-4 py-2">Name</p>
              <p className="border-l border-l-gray-600 px-4 py-2">
                Phone number
              </p>
            </div>
            <div className="w-12 px-2 col-span-1"></div>
            <div className="w-12 px-2 col-span-1"></div>
          </div>

          {!contacts && (
            <div className="w-full grid grid-cols-1 mt-2">
              <p className="px-4 py-5">Phone number list empty</p>
            </div>
          )}
          <div className="col-span-5">
            {contacts && contacts.length > 0 && (
              <div className="flex flex-col justify-start items-center rounded-sm">
                {contacts.map((contact) => (
                  <div
                    className="flex justify-start items-center rounded-sm w-full"
                    key={contact.phone}
                  >
                    <div className="w-12 px-2 col-span-1">
                      <Checkbox className="w-4 h-4" />
                    </div>
                    <div className="w-full grid grid-cols-2 col-span-4">
                      <p className="border-r border-r-gray-600 px-4 py-2">
                        {contact.name}
                      </p>
                      <p className="border-l border-l-gray-600 px-4 py-2">
                        {contact.phone}
                      </p>
                    </div>
                    <div className="w-12 px-2 col-span-1">
                      <Pen className="w-4 h-4" />
                    </div>
                    <div className="w-12 px-2 col-span-1">
                      <Trash className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {addNew && (
            <div className="w-full">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(saveContact)}
                  className="grid grid-cols-2 gap-x-2 gap-y-2 "
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            onChange={(e) =>
                              field.onChange(formatPhoneNumber(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormError message={error} />
                  <FormSuccess message={success} />

                  <Button
                    className="w-full mt-4 bg-gray-500 dark:bg-white dark:hover:bg-slate-200  hover:bg-primary/70 hover:text-primary-foreground"
                    size="lg"
                    type="submit"
                  >
                    Save
                  </Button>
                </form>
              </Form>
            </div>
          )}

          <div className="py-4">
            <Button onClick={() => setAddnew(true)}>Add More</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 py-4 place-content-start">
        <h4 className="text-lg font-bold px-4 col-span-1">Message:</h4>

        <div className="col-span-3">
          <div className="">
            <Textarea rows={20} onChange={(e) => setMessage(e.target.value)} />
            <span className="text-blue-500 text-sm italic">
              To insert their name in the message use #name
            </span>
          </div>

          <div className="py-4">
            <Button onClick={() => sendMessage()} disabled={loading}>
              Send Message {loading && <Loader2Icon className="animate-spin" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
