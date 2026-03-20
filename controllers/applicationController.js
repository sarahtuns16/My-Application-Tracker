import Application from '../models/Application.js';

export const createApplication = async (req, res) => {
  try {
    const { companyName, jobTitle, status, dateApplied, followUpDate, notes } = req.body;

    const application = await Application.create({
      userId: req.user.userId, // Note: Changed to req.user.userId to match JWT payload
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

export const getApplication = async (req, res) => {
  try {
    const application = await Application.find({ userId: req.user.userId }) // Note: Changed to req.user.userId
      .sort({ createdAt: -1 });

    res.status(200).json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.userId.toString() !== req.user.userId) { // Note: Changed to req.user.userId
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

export const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.userId.toString() !== req.user.userId) { // Note: Changed to req.user.userId
      return res.status(403).json({ message: 'Not authorized' });
    }

    await application.deleteOne();

    res.status(200).json({ message: 'Application deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};