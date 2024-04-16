import { EventUtilities } from '@sports-alliance/sports-lib/lib/events/utilities/event.utilities';
import { EventExporterGPX } from '@sports-alliance/sports-lib/lib/events/adapters/exporters/exporter.gpx';
import { SportsLib } from '@sports-alliance/sports-lib';
import { expose } from 'comlink';
import { DOMParser } from '@xmldom/xmldom';

// Type declarations for sports-lib (create a sports-lib.d.ts file for more complete definitions)
declare module '@sports-alliance/sports-lib' {
  interface EventInterface {
    // Add proper event interface properties based on sports-lib's implementation
  }

  export function importFromFit(buffer: ArrayBuffer): Promise<EventInterface>;
  export function importFromGPX(xmlString: string, parser: DOMParser): Promise<EventInterface>;
  export function importFromTCX(xmlDoc: Document): Promise<EventInterface>;
}

type SupportedFile = File & { name: string };
type FileExtension = 'fit' | 'gpx' | 'tcx';

const capitalize = (str: string): string => {
  return str.replace(/^\w/, (c) => c.toUpperCase());
};

class Merge {
  constructor(private files: SupportedFile[]) {}

  async blob(): Promise<Blob> {
    const events = await Promise.all(
      this.files.map((f) => this.fileToEvent(f))
    );
    const mergedEvent = EventUtilities.mergeEvents(events);
    const gpxString = await new EventExporterGPX().getAsString(mergedEvent);
    return new Blob([gpxString], { type: 'application/gpx+xml' });
  }

  private async fileToEvent(file: SupportedFile): Promise<any> { // Replace 'any' with proper Event type
    const extension = file.name.split('.').pop()?.toLowerCase() as FileExtension;
    const methodName = `fileToEvent${capitalize(extension)}`;
    
    switch (extension) {
      case 'fit':
        return this.fileToEventFit(file);
      case 'gpx':
        return this.fileToEventGpx(file);
      case 'tcx':
        return this.fileToEventTcx(file);
      default:
        throw new Error(`Unsupported file type: ${extension}`);
    }
  }

  private async fileToEventFit(file: SupportedFile): Promise<any> {
    const arrayBuffer = await file.arrayBuffer();
    return SportsLib.importFromFit(arrayBuffer);
  }

  private async fileToEventGpx(file: SupportedFile): Promise<any> {
    const text = await file.text();
    return SportsLib.importFromGPX(text, DOMParser);
  }

  private async fileToEventTcx(file: SupportedFile): Promise<any> {
    const text = await file.text();
    const xml = new DOMParser().parseFromString(text, 'application/xml');
    return SportsLib.importFromTCX(xml as unknown as XMLDocument);
  }
}

expose(Merge);