import Application from '../models/Application.js';

const createApplication = async (req, res) => {
  try {
    const { companyName, jobTitle, status, dateApplied, followUpDate, notes } = req.body;

    const application = await Application.create({
      userId: req.user.id,
      companyName,
      jobTitle,
      status,
      dateApplied,
      followUpDate,
      notes,
    });

    res.status(201).json(application);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updated = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await application.deleteOne();

    res.status(200).json({ message: 'Application deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { createApplication, getApplications, updateApplication, deleteApplication };