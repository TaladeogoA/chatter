import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "x9n5g34c",
  dataset: "production",
  useCdn: false,
  apiVersion: "2021-11-01",
});
