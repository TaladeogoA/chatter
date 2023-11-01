import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";
import { ImageAsset } from "@sanity/types";

const builder = imageUrlBuilder(client);

builder.format("webp").quality(80);

const buildImageUrl = (image: ImageAsset) => {
  return builder.image(image);
};

export { buildImageUrl };
