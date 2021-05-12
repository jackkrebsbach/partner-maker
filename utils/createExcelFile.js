import excel from "excel4node";

const createExcelList = (partnersJSON) => {
  const workbook = new excel.Workbook();
  const partnersObject = JSON.parse(partnersJSON);
  const students = Object.keys(partnersObject);

  const style = workbook.createStyle({
    font: { color: "black", size: 16 },
  });

  for (let i = 0; i < students.length; i++) {
    const worksheet = workbook.addWorksheet(`${students[i]}'s Partners`);
    const partner_list = partnersObject[students[i]];
    worksheet.cell(1, 2).string(students[i]).style(style);

    partner_list.forEach((entry, colIndex) => {
      worksheet
        .cell(colIndex + 2, 2)
        .string(entry)
        .style(style);
      worksheet
        .cell(colIndex + 2, 1)
        .string(colIndex + 1 + ".")
        .style(style);
    });
  }
  return workbook;
};

export default createExcelList;
