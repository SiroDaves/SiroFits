import { expose } from 'comlink';
import { Merge } from './merger';

const worker = {
  async mergeFiles(files: File[]) {
    const merger = new Merge(files);
    return merger.blob();
  }
};

export type MergeWorker = typeof worker;

expose(worker);