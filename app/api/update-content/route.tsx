import { createHmac, timingSafeEqual } from "crypto";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

const schema = z.object({
  type: z.string(),
  entity: z
    .object({
      id: z.string(),
      type: z.string(),
    })
    .required(),
  data: z.object({
    parent: z.object({
      id: z.string(),
      type: z.enum(["page", "database"]),
      data_source_id: z.string().optional(),
    }),
  }),
});

export async function POST(request: Request) {
  try {
    const headerList = await headers();
    const notionKey = headerList.get("X-Notion-Signature") || "";
    const resBody = await request.json();
    const validatedFields = schema.safeParse(resBody);

    //   Jika header tidak ada
    if (!notionKey) {
      console.log("HEADER NOT VALID");
      return new Response(
        JSON.stringify({
          errors: "NOTION SIGNATURE IS MISSING !",
        }),
        { status: 400 }
      );
    }

    // Return early if the form data is invalid
    if (!validatedFields.success) {
      console.log("DATA NOT VALID");
      return new Response(
        JSON.stringify({
          errors: "DATA NOT VALID",
        }),
        { status: 400 }
      );
    }

    // Validasi Request
    const verificationToken = process.env.NOTION_WEBHOOK_KEY as string;

    const calculatedSignature = `sha256=${createHmac(
      "sha256",
      verificationToken
    )
      .update(JSON.stringify(resBody))
      .digest("hex")}`;

    const isTrustedPayload = timingSafeEqual(
      Buffer.from(calculatedSignature),
      Buffer.from(notionKey)
    );

    //   Request tidak dipercaya
    if (!isTrustedPayload) {
      console.log("REQUEST NOT VALID");
      return new Response(
        JSON.stringify({ errors: "REQUEST NOT VALID. YOU ARE NOT ALLOW!" }),
        {
          status: 403,
        }
      );
    }

    const notionTypeUpdate = validatedFields.data.type;
    const notionAllowActions = [
      "page.created",
      "page.content_updated",
      "page.properties_updated",
      "page.deleted",
    ];
    const notionEntityUpdate = validatedFields.data.entity;
    const pagesNotionId = {
      "27c30f0e-6f0d-81fc-bf7c-000b7d2f8bf0": [
        // url nya salah
        "/portfolios",
        "/portfolios/featured",
        // Tambahkan buat detailnya
        `/portfolios/${notionEntityUpdate.id}`,
      ],
      "27c30f0e-6f0d-805f-9c03-ddcb94b79072": ["/"], // urlnya sudah benar
      "27c30f0e-6f0d-80c1-8aea-000b72dbca55": ["/carrers", "/carrers/active"],
    } as {
      [index: string]: string[];
    };

    const selectedPagesNotionId = validatedFields.data.data.parent
      .data_source_id
      ? pagesNotionId[validatedFields.data.data.parent.data_source_id as string]
      : pagesNotionId[notionEntityUpdate.id];
    // SEMENTARA

    // Jika tidak ada id yang cocok / melakukan aksi lain, seperti mengubah database dll
    if (
      !notionAllowActions.find((val) => val === notionTypeUpdate) ||
      !selectedPagesNotionId
    ) {
      console.log("REVALIDATE PATH NOT VALID");
      return new Response(
        JSON.stringify({ errors: "REVALIDATE PATH NOT VALID" }),
        {
          status: 200,
        }
      );
    }

    // Regenerate Page
    selectedPagesNotionId.forEach((val) => {
      revalidatePath(val);
    });
    return Response.json({ message: "success" });
  } catch (err) {
    console.log(`\n\n\n\n`);
    console.log(err);
    return new Response(
      JSON.stringify({ errors: "ERROR HAPPEND IN SERVER !" }),
      {
        status: 500,
      }
    );
  }
}
