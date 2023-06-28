import { db } from "../database/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//CREATE A post
export const createRoom = (req, res) => {
  const { roomName, Occupany, roomPrice, Hotel_ID, name, urlImg } = req.body;

  db.beginTransaction((err) => {
    if (err) {
      throw err;
    }

    const roomData = {
      roomName,
      roomPrice,
      Occupany,
      Hotel_ID
    };

    db.query('INSERT INTO room SET ?', roomData, (error, results, fields) => {
      if (error) {
        return db.rollback(() => {
          throw error;
        });
      }

      const scheduleData = [];

      for (let i = 1; i <= name.length; i++) {
        scheduleData.push([
          results.insertId,
          name[i - 1],
          urlImg[i - 1],
        ]);
      }

      db.query('INSERT INTO img (Room_ID, name, urlImg) VALUES ?', [scheduleData], (error, results, fields) => {
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

          res.status(201).json({ message: 'Room created successfully' });
        });
      });
    });
  });
}

//UPDATE A post
export const updateRoom = (req, res) => {
  //check user
  const q = "SELECT * FROM room WHERE Room_ID = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows == 0) {
      console.log(`Không có id room để cập nhật: ${req.params.id}`);
    }
    const { roomName, Occupany, roomPrice, Hotel_ID, name, urlImg } = req.body;

    db.beginTransaction((err) => {
      if (err) {
        throw err;
      }

      const tourData = {
        roomName,
        roomPrice,
        Occupany,
        Hotel_ID
      };

      db.query('UPDATE room SET ?', tourData, (error, results, fields) => {
        if (error) {
          return db.rollback(() => {
            throw error;
          });
        }

        const scheduleData = [];

        for (let i = 1; i <= name.length; i++) {
          scheduleData.push([
            results.insertId,
            name[i - 1],
            urlImg[i - 1],
          ]);
        }

        db.query('UPDATE img SET Room_ID=?,name=?,urlImg=?', [scheduleData], (error, results, fields) => {
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

            res.status(201).json({ message: 'Room created successfully' });
          });
        });
      });
    });
  });
}

//DELETE A post
export const deleteRoom = (req, res) => {
  const q = "SELECT * FROM Tour WHERE room_ID = ?";

  db.query(q, [req.params.id], (err, data) => {
    db.beginTransaction((err) => {
      if (err) {
        throw err;
      }

      db.query('DELETE FROM img WHERE Room_ID=?', [req.params.id], (error, results, fields) => {
        if (error) {
          return db.rollback(() => {
            throw error;
          });
        }

        db.query('DELETE FROM room WHERE Room_ID=?', [req.params.id], (error, results, fields) => {
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

            res.status(201).json({ message: 'Room deleted successfully' });
          });
        });
      });
    });
  });
}

// GET A post
export const getRoom = (req, res) => {
  const q = "SELECT * FROM room WHERE Room_ID = (?)";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) {
      return res.status(404).json({ message: 'Room not found.' });
    }

    let promises = [];

    const room = data[0];

    let imgQuery = `SELECT urlImg FROM img WHERE Room_ID = ?`;
    let imgPromise = new Promise((resolve, reject) => {
      db.query(imgQuery, [room.Room_ID], (err, imgData) => {
        if (err) return reject(err);
        let urls = imgData.map((img) => img.urlImg);
        resolve(urls);
      });
    });
    promises.push(imgPromise);
    Promise.all(promises)
      .then((values) => {
        room.urlImg = values[0];
        res.status(200).json(room);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
}

// GET ALL post
export const getRooms = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const end = page * limit;

  const q = `SELECT * FROM room`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    let promises = [];

    let rs = data.map((room) => {
      let imgQuery = `SELECT urlImg FROM img WHERE Room_ID = ?`;
      let promise = new Promise((resolve, reject) => {
        db.query(imgQuery, [room.Room_ID], (err, imgData) => {
          if (err) return reject(err);
          let urls = imgData.map((img) => img.urlImg);
          resolve({
            roomName: room.roomName,
            roomPrice: room.roomPrice,
            Occupany: room.Occupany,
            urlImg: urls,
          });
        });
      });
      promises.push(promise);
      return {
        roomName: room.roomName,
        roomPrice: room.roomPrice,
        Occupany: room.Occupany,
        urlImg: [],
      };
    });

    Promise.all(promises)
      .then((values) => {
        values.forEach((value, index) => {
          rs[index].urlImg = value.urlImg;
        });
        res.status(200).json({
          data: rs.slice(start, end),
          count_page: Math.ceil(rs.length / limit)
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
}

export const getTourByHotel = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const end = page * limit;

  const q = `SELECT * FROM room where Hotel_ID = ?`;

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    let promises = [];

    let rs = data.map((room) => {
      let imgQuery = `SELECT urlImg FROM img WHERE Room_ID = ?`;
      let promise = new Promise((resolve, reject) => {
        db.query(imgQuery, [room.Room_ID], (err, imgData) => {
          if (err) return reject(err);
          let urls = imgData.map((img) => img.urlImg);
          resolve({
            roomId: room.Room_ID,
            roomName: room.roomName,
            roomPrice: room.roomPrice,
            Occupany: room.Occupany,
            urlImg: urls,
          });
        });
      });
      promises.push(promise);
      return {
        roomId: room.Room_ID,
        roomName: room.roomName,
        roomPrice: room.roomPrice,
        Occupany: room.Occupany,
        urlImg: [],
      };
    });

    Promise.all(promises)
      .then((values) => {
        values.forEach((value, index) => {
          rs[index].urlImg = value.urlImg;
        });
        res.status(200).json({
          data: rs.slice(start, end),
          count_page: Math.ceil(rs.length / limit)
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
}