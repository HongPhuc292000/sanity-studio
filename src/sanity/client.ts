import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.PROJECT_ID,
  dataset: process.env.DATASET,
  apiVersion: process.env.API_VERSION,
  useCdn: false,
});
