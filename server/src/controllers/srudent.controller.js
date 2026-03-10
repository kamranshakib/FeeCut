import ExcelJS from "exceljs";
import fs from "fs";

export const addStudent = async (req, res) => {
  try {
    const { name, phone, discount } = req.body;

    const workbook = new ExcelJS.Workbook();
    const filePath = "students.xlsx";

    if (!fs.existsSync(filePath)) {
      const sheet = workbook.addWorksheet("Students");

      sheet.columns = [
        { header: "id", key: "id", width: 10 },
        { header: "name", key: "name", width: 30 },
        { header: "phone", key: "phone", width: 20 },
        { header: "discount", key: "discount", width: 10 },
      ];
      await workbook.xlsx.writeFile(filePath);
    } else {
      await workbook.xlsx.readFile(filePath);
    }

    const sheet = workbook.getWorksheet(1);

    const id = sheet.rowCount + 1;

    sheet.addRow([id, name, phone, discount]);

    await workbook.xlsx.writeFile(filePath);

    res.json({
      message: "Student saved successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
