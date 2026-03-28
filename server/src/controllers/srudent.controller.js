import ExcelJS from "exceljs";
import fs from "fs";
import path from "path";

export const addStudent = async (req, res) => {
  try {
    const { id, name, lastName, fatherName, school, province, examType, time } = req.body;

    if (!id || !name || !lastName || !fatherName || !school || !province || !examType || !time) {
      return res.status(400).json({ message: "تمام فیلدها ضروری هستند " });
    }

    let fileName;
    if (examType === "تخفیف پیشگام") fileName = "pishgam.xlsx";
    else if (examType === "تخفیف کانکوری") fileName = "konkori.xlsx";
    else if (examType === "تخفیف تطبیقات") fileName = "tatbiqat.xlsx"; 
    else return res.status(400).json({ message: "نوع امتحان نامعتبر " });

    const filePath = path.join(process.cwd(), fileName);

    const workbook = new ExcelJS.Workbook();
    let sheet;

    if (!fs.existsSync(filePath)) {
      sheet = workbook.addWorksheet("Students");
    } else {
      await workbook.xlsx.readFile(filePath);
      sheet = workbook.getWorksheet("Students") || workbook.addWorksheet("Students");
    }
    sheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Name", key: "name", width: 20 },
      { header: "Last Name", key: "lastName", width: 20 },
      { header: "Father Name", key: "fatherName", width: 20 },
      { header: "School", key: "school", width: 25 },
      { header: "Province", key: "province", width: 20 },
      { header: "Exam Type", key: "examType", width: 20 },
      { header: "Time", key: "time", width: 15 },
    ];
    const existingIds = [];
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) existingIds.push(row.getCell(1).value);
    });

    if (existingIds.includes(id)) {
      return res.status(400).json({ message: "این آیدی قبلاً ثبت شده " });
    }
    sheet.addRow({ id, name, lastName, fatherName, school, province, examType, time });

    await workbook.xlsx.writeFile(filePath);

    return res.status(201).json({
      success: true,
      message: `Student saved successfully in ${fileName} ✅`
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error ",
      error: error.message
    });
  }
};