"use client";

import React from 'react';
import { Header } from '@/components/reusable/Header';
import TcxTimeChanger from './time_changer';
import FileDataTable from './file_data_table';
import TxcFileCombiner from './file_combiner';

const TcxPage: React.FC = () => {

  return (
    <div>
      <section>
        <Header />
        <div className="border-solid rounded-lg border-2 border-orange-500 m-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-3">
            <div className="col-span-3 grid md:grid-cols-2 gap-10">
              <TcxTimeChanger />
              <FileDataTable />
            </div>
          </div>
        </div >
        <div className="m-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-3">
            <div className="col-span-3 grid md:grid-cols-2 gap-10">

              <div className="border-solid rounded-lg border-2 border-orange-500">
                <TxcFileCombiner />
              </div>

              <div className="border-solid rounded-lg border-2 border-orange-500"></div>
            </div>
          </div>
        </div >
      </section >
    </div >
  );
};

export default TcxPage;

