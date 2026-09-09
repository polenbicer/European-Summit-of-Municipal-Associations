# Excel export add-on

Add a long, private value named `ADMIN_EXPORT_TOKEN` to the Vercel environment variables. Do not put the real value in GitHub.

After deployment, download the current Excel file from:

`https://YOUR-SITE.vercel.app/api/export?token=YOUR_PRIVATE_TOKEN`

The generated workbook contains only these columns: İsim, Soyisim, Kurum, E-posta, Unvan and Katılım Durumu. It always includes the latest saved responses.
