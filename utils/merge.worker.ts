import { expose } from 'comlink';
import { Merge } from './merger';

class WorkerMerge {
  async merge(files: File[]) {
    const merger = new Merge(files);
    return merger.blob();
  }
}

expose(WorkerMerge);

export type MergeWorker = typeof WorkerMerge;