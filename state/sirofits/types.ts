export interface MoveFilesRequest {
  branch: string | undefined;
  paymentType: string;
  planNo: number;
  sumAssured: number;
  policyNumber: string;
}

export interface UploadDocumentRequest {
  filecontent: string;
  header: Header;
}

export interface Header {
  BPMRef: any;
  contextID: string;
  documentName: string;
  documentType: string;
  entityID: string;
  entityName: string;
  lobID: string;
  properties: any;
  refID: string;
  username: string;
}
