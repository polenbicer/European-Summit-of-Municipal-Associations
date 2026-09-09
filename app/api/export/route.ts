import ExcelJS from "exceljs";

export const runtime = "nodejs";

type Registration = {
  first_name: string;
  last_name: string;
  organisation: string;
  email: string;
  position: string;
  attendance: "attending" | "not_attending";
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const suppliedToken = url.searchParams.get("token");
  const exportToken = process.env.ADMIN_EXPORT_TOKEN;

  if (!exportToken || suppliedToken !== exportToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return new Response("Database configuration is missing", { status: 500 });
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/rsvps?select=first_name,last_name,organisation,email,position,attendance&order=updated_at.desc`,
    { headers: { apikey: serviceKey, authorization: `Bearer ${serviceKey}` }, cache: "no-store" }
  );

  if (!response.ok) {
    return new Response("Registrations could not be retrieved", { status: 500 });
  }

  const registrations = await response.json() as Registration[];
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "European Summit of Municipal Associations";
  const sheet = workbook.addWorksheet("Registrations", {
    views: [{ state: "frozen", ySplit: 1 }],
  });

  sheet.columns = [
    { header: "İsim", key: "first_name", width: 22 },
    { header: "Soyisim", key: "last_name", width: 22 },
    { header: "Kurum", key: "organisation", width: 36 },
    { header: "E-posta", key: "email", width: 34 },
    { header: "Unvan", key: "position", width: 32 },
    { header: "Katılım Durumu", key: "attendance", width: 22 },
  ];

  registrations.forEach((registration) => {
    sheet.addRow({
      ...registration,
      attendance: registration.attendance === "attending" ? "Katılacak" : "Katılmayacak",
    });
  });

  const header = sheet.getRow(1);
  header.font = { bold: true, color: { argb: "FFFFFFFF" } };
  header.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF7F1024" } };
  header.height = 24;
  sheet.autoFilter = "A1:F1";
  sheet.eachRow((row) => {
    row.alignment = { vertical: "middle" };
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return new Response(new Uint8Array(buffer), {
    headers: {
      "content-type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "content-disposition": 'attachment; filename="summit-registrations.xlsx"',
      "cache-control": "no-store",
    },
  });
}
