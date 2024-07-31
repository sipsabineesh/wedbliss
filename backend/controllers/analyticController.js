import User from '../models/userModel.js'
import Subscription from '../models/subscriptionModel.js'
import Plan from '../models/planModel.js';

export const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const maleUsers = await User.countDocuments({ gender: 'male' });
    const femaleUsers = await User.countDocuments({ gender: 'female' });
    
    res.json({ totalUsers, maleUsers, femaleUsers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const getPlanSelectionStats = async (req, res) => {
    try {
      const planSelection = await Subscription.aggregate([
        {
          $lookup: {
            from: 'plans',
            localField: 'planId',
            foreignField: '_id',
            as: 'plan'
          }
        },
        { $unwind: '$plan' },
        {
          $group: {
            _id: '$plan.planName',
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } }
      ]);
  
      res.json(planSelection);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


export const getSubscriptionStats = async (req, res) => {
    try {
        const subscriptions = await Subscription.aggregate([
            {
              $addFields: {
                month: { $month: { $toDate: "$_id" } },
                year: { $year: { $toDate: "$_id" } }
              }
            },
            {
              $group: {
                _id: { month: "$month", year: "$year" },
                count: { $sum: 1 }
              }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
          ]);
  
      res.json(subscriptions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
export const getUserGrowthStats = async (req, res) => {
    try {
        const userGrowth = await User.aggregate([
            {
              $group: {
                _id: {
                  date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                },
                newUsers: { $sum: 1 },
              },
            },
            {
              $sort: { "_id.date": 1 },
            },
            {
              $addFields: {
                date: "$_id.date",
              },
            },
            {
              $project: {
                _id: 0,
                date: 1,
                newUsers: 1,
              },
            },
          ]);
          
          let totalUsers = 0;
          const userGrowthWithTotal = userGrowth.map((item) => {
            totalUsers += item.newUsers;
            return { ...item, totalUsers };
          });
          
    
        res.json(userGrowthWithTotal);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}
    

export const getPlanDistributionStats = async (req, res) => {
    try {
        const planDistribution = await Subscription.aggregate([
          {
            $group: {
              _id: "$planId",
              value: { $sum: 1 }
            }
          },
          {
            $lookup: {
              from: "plans",
              localField: "_id",
              foreignField: "_id",
              as: "plan"
            }
          },
          {
            $unwind: "$plan"
          },
          {
            $project: {
              name: "$plan.planName",
              value: 1
            }
          }
        ]);
    
        res.json(planDistribution);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

export const getAgeStats = async (req, res) => {
    try {
        const ageDistribution = await User.aggregate([
          {
            $project: {
              age: {
                $divide: [{ $subtract: [new Date(), "$dob"] }, 1000 * 60 * 60 * 24 * 365],
              },
            },
          },
          {
            $bucket: {
              groupBy: "$age",
              boundaries: [0, 18, 25, 35, 45, 55, 65, 75, 85, 100],
              default: "Other",
              output: {
                count: { $sum: 1 },
              },
            },
          },
        ]);
    console.log(ageDistribution)
        res.json(ageDistribution);
      } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
      }
}

export const getCountryStats = async (req, res) => {
    try {
        const topCountries = await User.aggregate([
            {
                $group: {
                    _id: "$countryLivingIn",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 5
            },
            {
                $project: {
                    _id: 0,
                    country: "$_id",
                    count: 1
                }
            }
        ]);
        res.json(topCountries);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const getRegistrationVsSubscriptionStats = async (req, res) => {


    try {
        const registrations = await User.aggregate([
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    date: { $concat: [{ $toString: "$_id.year" }, "-", { $toString: "$_id.month" }] },
                    count: 1
                }
            },
            { $sort: { date: 1 } }
        ]);

        const subscriptions = await Subscription.aggregate([
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    date: { $concat: [{ $toString: "$_id.year" }, "-", { $toString: "$_id.month" }] },
                    count: 1
                }
            },
            { $sort: { date: 1 } }
        ]);
console.log(registrations, subscriptions)
        res.json({ registrations, subscriptions });
    } catch (err) {
        res.status(500).send(err.message);
    }
}