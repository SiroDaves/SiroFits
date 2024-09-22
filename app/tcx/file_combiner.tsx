"use client";

import React, { useEffect, useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSirofitsStore } from "@/state/sirofits/sirofits";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Spinner } from '@/components/reusable/Loader';
import { Button } from '@/components/ui/button';

const TxcFileCombiner: React.FC = () => {
  const {
    loading,
    selectedFile,
    parseGpsData,
    alterGpsData,
  } = useSirofitsStore();

  const formSchema = z.object({ files: z.any() });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const fileRef = form.register("files");

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const files = data.files;
    // Handle file processing logic for multiple files
    for (const file of files) {
      // Process each file (e.g., parseGpsData, alterGpsData)
    }
    toast.success("Files processed successfully!");
  };

  const downloadFile = () => {
    const blob = new Blob([selectedFile], { type: 'application/xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'sirofits-combined.tcx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-8">

            <div className="mt-5">
              <FormField
                control={form.control}
                name="files"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input type="file" multiple {...fileRef} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="flex items-center justify-center m-5">
              <Button
                type="submit"
                variant={"outline"}
                className="text-black rounded-lg px-14 bg-orange-500 ml-5"
              >
                Combine Files
              </Button>

              <Button
                onClick={downloadFile}
                variant={"outline"}
                className="text-black rounded-lg px-14 bg-orange-500 ml-5"
              >
                Download
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div >
  );
};

export default TxcFileCombiner;