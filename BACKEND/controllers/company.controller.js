import { Company } from '../models/company.model.js';

// Return a list of companies (minimal implementation)
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 });
    return res.status(200).json({ status: true, companies });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const id = req.params.id;
    const company = await Company.findById(id);
    if (!company) return res.status(404).json({ status: false, message: 'Company not found' });
    return res.status(200).json({ status: true, company });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const company = await Company.findByIdAndUpdate(id, updates, { new: true });
    if (!company) return res.status(404).json({ status: false, message: 'Company not found' });
    return res.status(200).json({ status: true, company });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
};

export const registerCompany = async (req, res) => {
  try {
    const { name, website, location } = req.body;
    if (!name) return res.status(400).json({ status: false, message: 'Name is required' });
    const newCompany = new Company({ name, website, location });
    await newCompany.save();
    return res.status(201).json({ status: true, company: newCompany });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
};
