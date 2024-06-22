"use client";
import { Tab } from "@/components/reusable/Tab";

import {
  AllActivities
} from "@/components/app/dashboard";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

export default function Dashboard() {

  const tabContents = [
    { value: "all", label: "All", Component: AllActivities },
  ];


  return (
    <div>
      <section className="bg-white px-5 rounded-xl py-4 px">
        <div className="mb-6">
          <form
            className="flex gap-3 flex-col md:flex-row space-x-2 w-1/2 mx-auto text-center mb-6 my-3 justify-center"
            onSubmit={(e) => {
            }}
          >
            <input
              className="flex h-9 w-full rounded-md border border-input bg-transparent 
          px-3 py-1 text-sm shadow-sm transition-colors file:border-0 
         focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
          disabled:cursor-not-allowed disabled:opacity-50"
              id="link"

            />
            <Button
              type="submit"
              size={"sm"}
              variant={"outline"}
              className="border-primary text-primary border-2"
            >
              <SearchIcon size={15} className="mr-1" /> Search
            </Button>
          </form>
        </div>
      </section>
      <br></br>
      <section className="bg-white px-5 rounded-xl py-4 px">
        <Tab tabContents={tabContents} />
      </section>

    </div>
  );
}