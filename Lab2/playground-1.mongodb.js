db.createCollection("people");

// 1
db.people.aggregate([
  {
    $match: {
      $or: [{ age: 40 }, { company: "Aivee" }],
    },
  },
]);

// 2
db.people.aggregate([
  {
    $match: {
      $and: [{ age: { $gt: 25 } }, { age: { $lt: 38 } }],
    },
  },
  {
    $limit: 5,
  },
]);

// 3
db.people.aggregate([
  {
    $match: {
      salary: { $gt: 20000 },
    },
  },
  {
    $sort: {
      age: 1,
    },
  },
  {
    $limit: 1,
  },
]);

// 4
db.people.aggregate([
  {
    $match: {
      country: "Russia",
    },
  },
  {
    $sort: {
      age: -1,
    },
  },
  {
    $skip: 2,
  },
  {
    $limit: 1,
  },
]);

// 5
db.people.aggregate([
  {
    $group: {
      _id: "$country",
      count: {
        $sum: 1,
      },
    },
  },
]);

// 6
db.people.aggregate([
  {
    $group: {
      _id: null,
      totalSalary: { $sum: "$salary" },
    },
  },
]);

// 7
db.people.aggregate([
  {
    $sort: {
      salary: -1,
    },
  },
  {
    $limit: 3,
  },
  {
    $group: {
      _id: null,
      totalSalary: {
        $sum: "$salary",
      },
    },
  },
]);

// 8
db.people.aggregate([
  {
    $group: {
      _id: "$company",
      avgSalary: {
        $avg: "$salary",
      },
    },
  },
  {
    $sort: {
      avgSalary: -1,
    },
  },
]);

// 9
db.people.aggregate([
  {
    $match: {
      country: "Germany",
    },
  },
  {
    $project: {
      full_name: { $concat: ["$first_name", " ", "$last_name"] },
    },
  },
]);

// 10
db.people.aggregate([
  {
    $group: {
      _id: "$age",
      count: {
        $sum: 1,
      },
    },
  },
]);

// 11
db.people.aggregate([
  {
    $match: {
      age: { $lt: 30 },
    },
  },
  {
    $project: {
      email: 1,
      _id: 0,
    },
  },
]);

// 12
db.people.aggregate([
  {
    $project: {
      full_name: { $concat: ["$first_name", " ", "$last_name"] },
      age: 1,
      country: 1,
      salary: { $multiply: ["$salary", 3] },
      _id: 0,
    },
  },
  {
    $out: {
      db: "test",
      coll: "newCollection",
    },
  },
]);

// 13
db.people.getIndexes();

// 14
db.people.explain("executionStats").find({ email: "kjovasevic0@blog.com" });

// 15
db.people.createIndex({ email: 1 });
db.people.explain("executionStats").find({ email: "kjovasevic0@blog.com" });

// 16
db.people.createIndex({ email: 1, age: 1 });

// 17
db.people.getIndexes();
db.people.hideIndex("email_1");
db.people.hideIndex("email_1_age_1");

// 18
db.people.dropIndexes();
