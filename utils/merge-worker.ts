import { expose } from 'comlink';

const worker = {
  async mergeFiles(files: File[]) {
    const merger = new Merge(files);
    return merger.blob();
  }
};

export type MergeWorker = typeof worker;

expose(worker);