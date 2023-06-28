import { db } from "../database/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//CREATE A TOUR
export const createTour = (req, res) => {
  const { nameTour, Occupany, Tour_price, time, addressId, Date_start, Date_end, include, uninclude, title, des, name, urlImg } = req.body;

  db.beginTransaction((err) => {
    if (err) {
      throw err;
    }

    const tourData = {
      nameTour,
      Occupany,
      Tour_price,
      time,
      addressId,
      Date_start,
      Date_end,
      include,
      uninclude
    };

    db.query('INSERT INTO tour SET ?', tourData, (error, results, fields) => {
      if (error) {
        return db.rollback(() => {
          throw error;
        });
      }

      const scheduleData = [];
      const inputId = results.insertId;
      for (let i = 1; i <= time; i++) {
        scheduleData.push([
          inputId,
          title[i - 1],
          des[i - 1],
        ]);
      }

      db.query('INSERT INTO schedule (Tour_ID, title, des) VALUES ?', [scheduleData], (error, results, fields) => {
        if (error) {
          return db.rollback(() => {
            throw error;
          });
        }

        const imgData = [];
        for (let j = 1; j <= name.length; j++) {
          imgData.push([
            inputId,
            name[j - 1],
            urlImg[j - 1],
          ]);
        }

        db.query('INSERT INTO img (Tour_ID, name, urlImg) VALUES ?', [imgData], (error, results, fields) => {
          if (error) {
            return db.rollback(() => {
              throw error;
            });
          }

          db.commit((error) => {
            if (error) {
              return db.rollback(() => {
                throw error;
              });
            }

            res.status(201).json({ message: 'Tour created successfully' });
          });
        });
      });
    });
  });
}

//UPDATE A TOUR
export const updateTour = (req, res) => {
  //check user
  const q = "SELECT * FROM Tour WHERE Tour_ID = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows == 0) {
      console.log(`Không có id tour để cập nhật: ${req.params.id}`);
    }
    // const { name, Occupany, Tour_price, time, Date_start, Date_end, include, uninclude, title, des } = req.body;
    const { nameTour, Occupany, Tour_price, time, addressId, Date_start, Date_end, include, uninclude, title, des, name, urlImg } = req.body;


    db.beginTransaction((err) => {
      if (err) {
        throw err;
      }

      const tourData = {
        nameTour,
        Occupany,
        Tour_price,
        time,
        addressId,
        Date_start,
        Date_end,
        include,
        uninclude
      };

      db.query('UPDATE tour SET ? where Tour_ID = ?', [tourData, req.params.id], (error, results, fields) => {
        if (error) {
          return db.rollback(() => {
            throw error;
          });
        }

        const scheduleData = [];

        for (let i = 1; i <= time; i++) {
          scheduleData.push([
            req.params.id,
            title[i - 1],
            des[i - 1],
          ]);
        }

        db.query('UPDATE schedule SET Tour_ID=?,title=?,des=?', [scheduleData], (error, results, fields) => {
          if (error) {
            return db.rollback(() => {
              throw error;
            });
          }

          const imgData = [];
          for (let j = 1; j <= name.length; j++) {
            imgData.push([
              req.params.id,
              name[j - 1],
              urlImg[j - 1],
            ]);
          }

          db.query('update img (Tour_ID, name, urlImg) VALUES ?', [imgData], (error, results, fields) => {
            if (error) {
              return db.rollback(() => {
                throw error;
              });
            }

            db.commit((error) => {
              if (error) {
                return db.rollback(() => {
                  throw error;
                });
              }

              res.status(201).json({ message: 'Tour updated successfully' });
            });
          });
        });
      });
    });
  });
}

//DELETE A TOUR
export const deleteTour = (req, res) => {
  const q = "SELECT * FROM Tour WHERE Tour_ID = ?";

  db.query(q, [req.params.id], (err, data) => {
    db.beginTransaction((err) => {
      if (err) {
        throw err;
      }
      db.query('DELETE FROM img WHERE Tour_ID=?', [req.params.id], (error, results, fields) => {
        if (error) {
          return db.rollback(() => {
            throw error;
          });
        }
        db.query('DELETE FROM schedule WHERE Tour_ID=?', [req.params.id], (error, results, fields) => {
          if (error) {
            return db.rollback(() => {
              throw error;
            });
          }

          db.query('DELETE FROM tour WHERE Tour_ID=?', [req.params.id], (error, results, fields) => {
            if (error) {
              return db.rollback(() => {
                throw error;
              });
            }

            db.commit((error) => {
              if (error) {
                return db.rollback(() => {
                  throw error;
                });
              }

              res.status(201).json({ message: 'Tour deleted successfully' });
            });
          });
        });
      });
    });
  });
}

// GET A TOUR
export const getTour = (req, res) => {
  const q = `SELECT * FROM tour WHERE Tour_ID = ?`; // Thêm điều kiện WHERE

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) {
      // Nếu không tìm thấy tour với Tour_ID là 1
      return res.status(404).json({ message: 'Tour not found.' });
    }

    let promises = [];

    const tour = data[0]; // Lấy tour đầu tiên từ kết quả tìm kiếm

    let imgQuery = `SELECT urlImg FROM img WHERE Tour_ID = ?`;
    let imgPromise = new Promise((resolve, reject) => {
      db.query(imgQuery, [tour.Tour_ID], (err, imgData) => {
        if (err) return reject(err);
        let urls = imgData.map((img) => img.urlImg);
        resolve(urls);
      });
    });

    let scheduleQuery = `SELECT des FROM schedule WHERE Tour_ID = ?`;
    let schedulePromise = new Promise((resolve, reject) => {
      db.query(scheduleQuery, [tour.Tour_ID], (err, scheduleData) => {
        if (err) return reject(err);
        let des = scheduleData.map((e) => e.des);
        resolve(des);
      });
    });
    let addressQuery = `SELECT name FROM address WHERE addressId = ?`;
    let addressPromise = new Promise((resolve, reject) => {
      db.query(addressQuery, [tour.addressId], (err, addressData) => {
        if (err) return reject(err);
        if (addressData.length === 0) {
          return resolve(null);
        }
        resolve(addressData[0].name);
      });
    });
    promises.push(imgPromise);
    promises.push(schedulePromise);
    promises.push(addressPromise);

    Promise.all(promises)
      .then((values) => {
        tour.urlImg = values[0];
        tour.des = values[1];
        tour.addressName = values[2];
        res.status(200).json(tour);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

}

// GET ALL TOUR
export const getTours = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const start = (page - 1) * limit;
  const end = page * limit;
  const q = `SELECT * FROM tour LIMIT ${start}, ${limit}`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    let promises = [];

    let tours = data.map((tour) => {
      let imgQuery = `SELECT urlImg FROM img WHERE Tour_ID = ?`;
      let imgPromise = new Promise((resolve, reject) => {
        db.query(imgQuery, [tour.Tour_ID], (err, imgData) => {
          if (err) return reject(err);
          let urls = imgData.map((img) => img.urlImg);
          resolve(urls);
        });
      });

      let scheduleQuery = `SELECT des FROM schedule WHERE Tour_ID = ?`;
      let schedulePromise = new Promise((resolve, reject) => {
        db.query(scheduleQuery, [tour.Tour_ID], (err, scheduleData) => {
          if (err) return reject(err);
          let des = scheduleData.map((e) => e.des);
          resolve(des);
        });
      });
      let addressQuery = `SELECT name FROM address WHERE addressId = ?`;
      let addressPromise = new Promise((resolve, reject) => {
        db.query(addressQuery, [tour.addressId], (err, addressData) => {
          if (err) return reject(err);
          if (addressData.length === 0) {
            return resolve(null);
          }
          resolve(addressData[0].name);
        });
      });
      promises.push(imgPromise);
      promises.push(schedulePromise);
      promises.push(addressPromise);

      return {
        Tour_ID: tour.Tour_ID,
        nameTour: tour.nameTour,
        tourPrice: tour.Tour_price,
        Occupany: tour.Occupany,
        dateStart: tour.Date_start,
        dateEnd: tour.Date_end,
        time: tour.time,
        address: tour.address,
        tourType: tour.tourType,
        include: tour.include,
        uninclude: tour.uninclude,
        urlImg: [],
        des: [],
      };
    });

    Promise.all(promises)
      .then((values) => {
        values.forEach((value, index) => {
          let idx = Math.floor(index / 3);
          if (index % 3 === 0) {
            tours[idx].urlImg = value;
          } else if (index % 3 === 1) {
            tours[idx].des = value;
          } else {
            tours[idx].addressName = value;
          }
        });

        const countQuery = 'SELECT COUNT(*) AS total FROM tour';
        db.query(countQuery, (err, countData) => {
          if (err) return res.status(500).json(err);
          const totalCount = countData[0].total;
          const count_page = Math.ceil(totalCount / limit);

          res.status(200).json({
            data: tours,
            count_page: count_page,
          });
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
}

export const searchRes = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const end = page * limit;
  const city = req.query.city;
  const distance = parseInt(req.query.distance) || 0;
  const maxGroupSize = parseInt(req.query.maxGroupSize) || 0;
  let conditions = [];

  if (city) {
    conditions.push(`name LIKE '%${city}%'`);
  }

  if ((distance)) {
    conditions.push(`Tour_price = ${distance}`);
  }

  if ((maxGroupSize)) {
    conditions.push(`Occupany >= ${maxGroupSize}`);
  }

  let conditionQuery = "";
  if (conditions.length > 0) {
    conditionQuery = "WHERE " + conditions.join(" AND ");
  }

  // const q = `SELECT * FROM tour join address on tour.addressId = address.addressId where name like '%${city}%' and Tour_price = ${distance} and Occupany >= ${maxGroupSize}`;
  const q = `SELECT * FROM tour join address on tour.addressId = address.addressId ${conditionQuery}`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    let promises = [];

    let tours = data.map((tour) => {
      let imgQuery = `SELECT urlImg FROM img WHERE Tour_ID = ?`;
      let imgPromise = new Promise((resolve, reject) => {
        db.query(imgQuery, [tour.Tour_ID], (err, imgData) => {
          if (err) return reject(err);
          let urls = imgData.map((img) => img.urlImg);
          resolve(urls);
        });
      });

      let scheduleQuery = `SELECT des FROM schedule WHERE Tour_ID = ?`;
      let schedulePromise = new Promise((resolve, reject) => {
        db.query(scheduleQuery, [tour.Tour_ID], (err, scheduleData) => {
          if (err) return reject(err);
          let des = scheduleData.map((e) => e.des);
          resolve(des);
        });
      });
      let addressQuery = `SELECT name FROM address WHERE addressId = ?`;
      let addressPromise = new Promise((resolve, reject) => {
        db.query(addressQuery, [tour.addressId], (err, addressData) => {
          if (err) return reject(err);
          if (addressData.length === 0) {
            return resolve(null);
          }
          resolve(addressData[0].name);
        });
      });
      promises.push(imgPromise);
      promises.push(schedulePromise);
      promises.push(addressPromise);
      return {
        Tour_ID: tour.Tour_ID,
        nameTour: tour.nameTour,
        tourPrice: tour.Tour_price,
        Occupany: tour.Occupany,
        dateStart: tour.Date_start,
        dateEnd: tour.Date_end,
        time: tour.time,
        address: tour.address,
        include: tour.include,
        uninclude: tour.uninclude,
        urlImg: [],
        des: [],
      };
    });

    Promise.all(promises)
      .then((values) => {
        values.forEach((value, index) => {
          let idx = Math.floor(index / 3);
          if (index % 3 === 0) {
            tours[idx].urlImg = value;
          } else if (index % 3 === 1) {
            tours[idx].des = value;
          } else {
            tours[idx].addressName = value;
          }
        });

        res.status(200).json({
          data: tours.slice(start, end),
          count_page: Math.ceil(tours.length / limit),
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
}

export const getFetures = (req, res) => {
  const q = "SELECT *, sum(feedback_system.serviceRating)/count(feedback_system.Feedback_ID) as 'avg' from feedback_system join tour on feedback_system.Tour_ID = tour.Tour_ID group by feedback_system.tour_id having avg > 4";
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const end = page * limit;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    let promises = [];

    let tours = data.map((tour) => {
      let imgQuery = `SELECT urlImg FROM img WHERE Tour_ID = ?`;
      let imgPromise = new Promise((resolve, reject) => {
        db.query(imgQuery, [tour.Tour_ID], (err, imgData) => {
          if (err) return reject(err);
          let urls = imgData.map((img) => img.urlImg);
          resolve(urls);
        });
      });

      let scheduleQuery = `SELECT des FROM schedule WHERE Tour_ID = ?`;
      let schedulePromise = new Promise((resolve, reject) => {
        db.query(scheduleQuery, [tour.Tour_ID], (err, scheduleData) => {
          if (err) return reject(err);
          let des = scheduleData.map((e) => e.des);
          resolve(des);
        });
      });
      let addressQuery = `SELECT name FROM address WHERE addressId = ?`;
      let addressPromise = new Promise((resolve, reject) => {
        db.query(addressQuery, [tour.addressId], (err, addressData) => {
          if (err) return reject(err);
          if (addressData.length === 0) {
            return resolve(null);
          }
          resolve(addressData[0].name);
        });
      });
      promises.push(imgPromise);
      promises.push(schedulePromise);
      promises.push(addressPromise);
      return {
        Tour_ID: tour.Tour_ID,
        nameTour: tour.nameTour,
        tourPrice: tour.Tour_price,
        Occupany: tour.Occupany,
        dateStart: tour.Date_start,
        dateEnd: tour.Date_end,
        time: tour.time,
        address: tour.address,
        include: tour.include,
        uninclude: tour.uninclude,
        urlImg: [],
        des: [],
      };
    });

    Promise.all(promises)
      .then((values) => {
        values.forEach((value, index) => {
          let idx = Math.floor(index / 3);
          if (index % 3 === 0) {
            tours[idx].urlImg = value;
          } else if (index % 3 === 1) {
            tours[idx].des = value;
          } else {
            tours[idx].addressName = value;
          }
        });

        res.status(200).json({
          data: tours.slice(start, end),
          count_page: Math.ceil(tours.length / limit),
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
}

export const getCount = (req, res) => {
  const q = `SELECT count(Tour_ID) as count FROM tour where Occupany > 0`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
}