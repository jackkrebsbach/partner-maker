import getPartners from "../../utils/main";
import createExcelList from "../../utils/createExcelFile";
import Student from "../../components/Student";

export default function handler(req, res) {
  try {
    const { Students } = req.query;
    const partners = JSON.stringify(getPartners(Students.split(",")));
    let workbook = createExcelList(partners);
    workbook.write("PartnerList.xlsx", res);
  } catch (e) {
    res.status(401).json(e);
  }
}
