"use client";

import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSirofitsStore } from "@/state/sirofits/sirofits";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Spinner } from '@/components/reusable/Loader';
import { Button } from '@/components/ui/button';

const TcxTimeChanger: React.FC = () => {
  const {
    loading,
    fileData,
    selectedFile,
    parseGpsData,
    alterGpsData,
  } = useSirofitsStore();

  const formSchema = z.object({ file: z.any() });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const fileRef = form.register("file");
  const [fileContent, setFileContent] = useState<string | null>(null);

  const onFileChange = (e: any) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    if (file) {
      reader.readAsText(file);
      reader.onload = async () => {
        var fileContent = reader.result as string;
        setFileContent(fileContent);
        await parseGpsData(fileContent);
      };
      reader.onerror = (error: any) => {
        toast.error("Something went wrong!", {
          description: error?.response?.data?.description,
        });
      };
    }
  };

  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    if (fileData?.startTime) {
      setStartTime(new Date(fileData.startTime));
    }
  }, [fileData?.startTime]);

  const handleDateChange = (date: Date | null) => {
    setStartTime(date);
  };

  const changeTime = async () => {
    if (startTime && fileContent) {
      const formattedTime = startTime.toISOString().substring(0, 19) + "Z";
      await alterGpsData(fileContent, formattedTime);
    } else {
      toast.error("Please select a date and upload a file.");
    }
  };

  const downloadFile = () => {
    const blob = new Blob([selectedFile], { type: 'application/xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'sirofits-newtime.tcx';
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
          <form onSubmit={form.handleSubmit(async () => { })} className="w-full p-8">

            <div className="mt-5">
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="file"
                          {...fileRef}
                          onChange={onFileChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="grid grid-cols-1 place-content-center m-5">
              <DatePicker
                selected={startTime}
                onChange={handleDateChange}
                showTimeSelect
                timeIntervals={5} 
                dateFormat="Pp"
                className="p-2 border rounded text-black w-full"
              />
            </div>

            <div className="flex items-center justify-center m-5">
              <Button
                onClick={changeTime}
                variant={"outline"}
                className="text-black rounded-lg px-14 bg-orange-500 ml-5"
              >
                Change Time
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

export default TcxTimeChanger;