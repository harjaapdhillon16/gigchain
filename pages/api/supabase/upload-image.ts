// pages/api/upload.ts

import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import formidable, { File, Files } from "formidable";
import fs from "fs";

const supabaseUrl: string = process.env.SUPABASE_URL ?? "";
const supabaseKey: string = process.env.SUPABASE_SECRET ?? "";
const supabase = createClient(supabaseUrl, supabaseKey);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    const form = formidable({});
    const [fields, files] = await form.parse(req);

    const file = files.file as unknown as File;
    const table = fields?.table?.[0] ?? "";
    const uploadPath = fields?.pathToUpload?.[0] ?? "";
    console.log({ files });

    try {
      const { data, error } = await supabase.storage
        .from(table) // Replace with your Supabase bucket name
        .upload(uploadPath, file as any, {
          upsert: true,
        });

      if (error) {
        throw error;
      }

      res.status(200).json({ data });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
