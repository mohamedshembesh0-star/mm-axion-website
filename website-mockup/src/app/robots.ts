import type { MetadataRoute } from "next";
import { READY_TO_INDEX } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return READY_TO_INDEX
    ? { rules: { userAgent: "*", allow: "/" } }
    : { rules: { userAgent: "*", disallow: "/" } };
}
