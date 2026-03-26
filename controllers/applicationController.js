import Application from '../models/Application.js';

export const createApplication = async (req, res) => {
  console.log("FULL REQUEST USER:", req.user);
  try {
    const { companyName, jobTitle, status, dateApplied, followUpDate, notes } = req.body;

    const application = await Application.create({
      userId: req.user,
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

export const getApplication = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const total = await Application.countDocuments({ userId: req.user });

    const applications = await Application.find({ userId: req.user }) 
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(total / limit),
      total,
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};

export const updateApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.userId.toString() !== req.user) { 
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

    if (application.userId.toString() !== req.user) { 
      return res.status(403).json({ message: 'Not authorized' });
    }

    await application.deleteOne();

    res.status(200).json({ message: 'Application deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};