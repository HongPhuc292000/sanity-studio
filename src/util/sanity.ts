import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "@/sanity/client";

const { projectId, dataset } = client.config();
export const urlFor = (source: any) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;
